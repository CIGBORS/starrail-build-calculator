import redis from "../../../redis/redisClient.js";
import crypto from "crypto";

const CHARACTER_CACHE_PREFIX = "cache:character:data:";
const CHARACTER_HISTORY_KEY = "cache:character:history";
const MAX_CACHE_SIZE = 10;

/**
 * Busca um personagem no cache. Se existir, atualiza a posição na lista LRU.
 */
export async function getCachedCharacter(id) {
  try {
    const cached = await redis.get(`${CHARACTER_CACHE_PREFIX}${id}`);
    if (cached) {
      // Se achou no cache (LRU hit), movemos para o topo da lista para não expirar cedo
      await redis.lRem(CHARACTER_HISTORY_KEY, 0, id);
      await redis.lPush(CHARACTER_HISTORY_KEY, id);
      
      const currentCacheList = await redis.lRange(CHARACTER_HISTORY_KEY, 0, -1);
      console.log(`[CACHE LRU] Lista atualizada após acesso:`, currentCacheList);
      
      return JSON.parse(cached);
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar do cache do Redis:", error);
    return null; // Em caso de falha no redis, retorna null para buscar da API
  }
}

/**
 * Salva um personagem no cache e aplica a lógica de LRU (tamanho máximo 10).
 */
export async function setCachedCharacter(id, data) {
  try {
    const key = `${CHARACTER_CACHE_PREFIX}${id}`;
    
    // Salva os dados
    await redis.set(key, JSON.stringify(data));
    
    // Remove o ID se ele já estiver na lista (para evitar duplicações) e insere no topo (mais recente)
    await redis.lRem(CHARACTER_HISTORY_KEY, 0, id);
    await redis.lPush(CHARACTER_HISTORY_KEY, id);
    
    // Verifica se passamos do limite de 10
    const length = await redis.lLen(CHARACTER_HISTORY_KEY);
    if (length > MAX_CACHE_SIZE) {
      // Remove o mais antigo (do final da lista)
      const oldestId = await redis.rPop(CHARACTER_HISTORY_KEY);
      if (oldestId) {
        // Deleta os dados do cache do personagem mais antigo
        await redis.del(`${CHARACTER_CACHE_PREFIX}${oldestId}`);
      }
    }
    
    // Mostra quais personagens estão em cache atualmente
    const currentCacheList = await redis.lRange(CHARACTER_HISTORY_KEY, 0, -1);
    console.log(`[CACHE LRU] Lista de IDs de personagens atualmente no cache:`, currentCacheList);
    
  } catch (error) {
    console.error("Erro ao salvar no cache do Redis:", error);
  }
}

/**
 * Gera uma chave única para o cache baseada no objeto de filtros.
 */
function generateFilterKey(prefix, filters) {
  const filterString = filters ? JSON.stringify(filters) : "all";
  // Pode codificar em base64 ou usar direto a string json na chave
  return `cache:filters:${prefix}:${Buffer.from(filterString).toString("base64")}`;
}

/**
 * Busca o resultado de um filtro no cache.
 */
export async function getCachedFilters(prefix, filters) {
  try {
    const key = generateFilterKey(prefix, filters);
    const cached = await redis.get(key);
    if (cached) {
      const historyKey = `cache:filters:${prefix}:history`;
      
      // Move para o topo da lista LRU
      await redis.lRem(historyKey, 0, key);
      await redis.lPush(historyKey, key);
      
      const currentCacheList = await redis.lRange(historyKey, 0, -1);
      console.log(`[CACHE LRU Filtros (${prefix})] Lista atualizada após acesso:`, currentCacheList);

      return JSON.parse(cached);
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar filtros no cache:", error);
    return null;
  }
}

/**
 * Salva o resultado de um filtro no cache com expiração (padrão 12 horas).
 */
export async function setCachedFilters(prefix, filters, data, ttlSeconds = 43200) {
  try {
    const key = generateFilterKey(prefix, filters);
    // Usa SETEX para definir a chave e o tempo de expiração
    await redis.setEx(key, ttlSeconds, JSON.stringify(data));

    const historyKey = `cache:filters:${prefix}:history`;
    
    // Adiciona na lista LRU
    await redis.lRem(historyKey, 0, key);
    await redis.lPush(historyKey, key);
    
    // Verifica limite de 10
    const length = await redis.lLen(historyKey);
    if (length > MAX_CACHE_SIZE) {
      const oldestKey = await redis.rPop(historyKey);
      if (oldestKey) {
        await redis.del(oldestKey);
      }
    }
    
    const currentCacheList = await redis.lRange(historyKey, 0, -1);
    console.log(`[CACHE LRU Filtros (${prefix})] Lista de pesquisas atualmente no cache:`, currentCacheList);

  } catch (error) {
    console.error("Erro ao salvar filtros no cache:", error);
  }
}

/**
 * Gera um hash único para a combinação de payload de build
 */
function generateBuildKey(payload) {
  const payloadString = JSON.stringify(payload);
  const hash = crypto.createHash("md5").update(payloadString).digest("hex");
  return `cache:build:data:${hash}`;
}

const BUILD_HISTORY_KEY = "cache:build:history";
const MAX_BUILD_CACHE_SIZE = 50;

/**
 * Busca um cálculo de build salvo no cache (LRU de 50)
 */
export async function getCachedBuild(payload) {
  try {
    const key = generateBuildKey(payload);
    const cached = await redis.get(key);
    
    if (cached) {
      await redis.lRem(BUILD_HISTORY_KEY, 0, key);
      await redis.lPush(BUILD_HISTORY_KEY, key);
      
      const currentCacheList = await redis.lRange(BUILD_HISTORY_KEY, 0, -1);
      console.log(`[CACHE LRU Builds] Lista atualizada após acesso. Total salvos: ${currentCacheList.length}`);
      
      return JSON.parse(cached);
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar build no cache do Redis:", error);
    return null;
  }
}

/**
 * Salva o resultado de um cálculo de build (LRU de 50)
 */
export async function setCachedBuild(payload, data) {
  try {
    const key = generateBuildKey(payload);
    
    // Salva a build
    await redis.set(key, JSON.stringify(data));
    
    await redis.lRem(BUILD_HISTORY_KEY, 0, key);
    await redis.lPush(BUILD_HISTORY_KEY, key);
    
    const length = await redis.lLen(BUILD_HISTORY_KEY);
    if (length > MAX_BUILD_CACHE_SIZE) {
      const oldestKey = await redis.rPop(BUILD_HISTORY_KEY);
      if (oldestKey) {
        await redis.del(oldestKey);
      }
    }
    
    const currentCacheList = await redis.lRange(BUILD_HISTORY_KEY, 0, -1);
    console.log(`[CACHE LRU Builds] Build salva. Total no cache: ${currentCacheList.length}`);
    
  } catch (error) {
    console.error("Erro ao salvar build no cache do Redis:", error);
  }
}
