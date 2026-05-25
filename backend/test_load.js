import { createClient } from "redis";

async function runLoadTest() {
  console.log("=== INICIANDO TESTE DE CARGA (WORKERS) ===");
  
  // Conecta no Redis rodando localmente no Docker (Porta 6379)
  const redis = createClient({ url: "redis://localhost:6379" });
  
  redis.on("error", (err) => console.log("Redis Error:", err));
  await redis.connect();
  console.log("-> Conectado ao Redis local.");

  const TOTAL_JOBS = 5000;
  console.log(`-> Preparando injeção de ${TOTAL_JOBS} cálculos na fila 'build-stream'...`);

  // Payload genérico de teste
  const fakePayload = JSON.stringify({
    charName: "Acheron",
    lcName: "Along the Passing Shore",
    cavernName: "Pioneer Diver of Dead Waters",
    planarName: "Izumo Gensei and Takama Divine Realm",
    relicStats: {
      head: { main: { stat: null, value: null }, subs: [{ stat: null, value: null }] },
      hands: { main: { stat: null, value: null }, subs: [{ stat: null, value: null }] },
      body: { main: { stat: null, value: null }, subs: [{ stat: null, value: null }] },
      boots: { main: { stat: null, value: null }, subs: [{ stat: null, value: null }] },
      sphere: { main: { stat: null, value: null }, subs: [{ stat: null, value: null }] },
      rope: { main: { stat: null, value: null }, subs: [{ stat: null, value: null }] }
    }
  });

  // Marca tempo inicial da injeção
  const startInject = Date.now();
  
  // Pipeline para inserção massiva super rápida
  const multi = redis.multi();
  for (let i = 0; i < TOTAL_JOBS; i++) {
    const jobId = `test-job-${i}`;
    multi.xAdd("build-stream", "*", {
      jobId,
      payload: fakePayload,
      timestamp: Date.now().toString()
    });
  }
  await multi.exec();
  const endInject = Date.now();
  console.log(`-> Injeção concluída em ${(endInject - startInject)}ms!`);

  console.log("-> Monitorando a drenagem da fila pelos Workers...");
  const startDrain = Date.now();

  let isDrained = false;
  while (!isDrained) {
    await new Promise((r) => setTimeout(r, 1000)); // Checa a cada 1 segundo

    try {
      // Checa as estatísticas do grupo de consumo "workers" na stream
      const groupInfo = await redis.xInfoGroups("build-stream");
      const workersGroup = groupInfo.find(g => g.name === "workers");
      
      if (workersGroup) {
        const pending = workersGroup.pending; // Mensagens sendo processadas / falhas não confirmadas
        
        // Pega tamanho total atual
        const streamInfo = await redis.xInfoStream("build-stream");
        const length = streamInfo.length;

        // Limpando as mensagens antigas para não estourar memória é ideal, mas aqui vemos o andamento
        console.log(`[Status] Mensagens totais na stream: ${length} | Pendentes/Em processo: ${pending}`);

        // A stream é considerada "esvaziada" de processamento ativo quando as pending zeram 
        // E o firstId aproxima do lastId ou nós lemos tudo.
        // Uma forma melhor de testar no nosso caso: A injeção inseriu 5000 de uma vez.
        // O XREADGROUP do worker processa 1 por vez.
        // Vamos checar quantos jobs "test-job-X" estão como resultado no redis.
      }
      
      // Simplificando o cheque: Contamos chaves de build-result:*
      const results = await redis.keys("build-result:test-job-*");
      console.log(`[Progresso] Workers finalizaram ${results.length}/${TOTAL_JOBS} cálculos...`);

      if (results.length >= TOTAL_JOBS) {
        isDrained = true;
      }
    } catch (e) {
      console.error("Erro no monitoramento:", e.message);
    }
  }

  const endDrain = Date.now();
  const totalSeconds = (endDrain - startDrain) / 1000;
  const throughput = TOTAL_JOBS / totalSeconds;

  console.log("=========================================");
  console.log(`✅ TESTE CONCLUÍDO!`);
  console.log(`Total Processado: ${TOTAL_JOBS} cálculos`);
  console.log(`Tempo total dos workers: ${totalSeconds.toFixed(2)} segundos`);
  console.log(`Vazão (Throughput): ${throughput.toFixed(2)} cálculos por segundo (TPS)`);
  console.log("=========================================");

  await redis.quit();
  process.exit(0);
}

runLoadTest();
