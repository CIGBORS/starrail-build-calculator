import { getCharacterAllInformations, getCharactersFilters, getAllCharactersCard } from './src/services/starRail.service.js';
import redis from './redis/redisClient.js';

async function testCache() {
  console.log("--- Testando Personagem ---");
  console.log("1. Buscando personagem 1001 (Primeira vez - Miss)");
  console.time("Fetch 1001");
  await getCharacterAllInformations("1001");
  console.timeEnd("Fetch 1001");

  console.log("2. Buscando personagem 1001 (Segunda vez - Hit)");
  console.time("Cache Hit 1001");
  await getCharacterAllInformations("1001");
  console.timeEnd("Cache Hit 1001");

  console.log("--- Testando LRU (Inserindo mais 10 personagens) ---");
  for (let i = 1002; i <= 1012; i++) {
    await getCharacterAllInformations(i.toString());
  }
  
  const history = await redis.lRange("cache:character:history", 0, -1);
  console.log("Histórico LRU atual (tamanho " + history.length + "):", history);

  const cached1001 = await redis.get("cache:character:data:1001");
  console.log("Personagem 1001 ainda no cache?", cached1001 ? "Sim" : "Não (Removido corretamente pelo LRU)");


  console.log("\n--- Testando Filtros ---");
  const filters = { name: "Março" };
  console.time("Filtros Miss");
  await getCharactersFilters(filters);
  console.timeEnd("Filtros Miss");

  console.time("Filtros Hit");
  await getCharactersFilters(filters);
  console.timeEnd("Filtros Hit");

  console.time("Cards Miss");
  await getAllCharactersCard(filters);
  console.timeEnd("Cards Miss");

  console.time("Cards Hit");
  await getAllCharactersCard(filters);
  console.timeEnd("Cards Hit");

  process.exit(0);
}

testCache();
