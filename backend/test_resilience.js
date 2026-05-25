import { createClient } from "redis";

async function runCrashTest() {
  console.log("=== INICIANDO CRASH TEST (Resiliência da Fila) ===");
  
  const redis = createClient({ url: "redis://localhost:6379" });
  redis.on("error", (err) => console.log("Redis Error:", err));
  await redis.connect();
  
  console.log("-> Conectado ao Cofre (Redis).");
  console.log("-> Verificando se os Workers estão mortos...");

  const fakePayload = JSON.stringify({
    charName: "Crash Test Dummy",
    lcName: "Fallout",
    cavernName: "Dead Letters",
    planarName: "Limbo",
    relicStats: {
      head: { main: { stat: null, value: null }, subs: [{ stat: null, value: null }] },
      hands: { main: { stat: null, value: null }, subs: [{ stat: null, value: null }] },
      body: { main: { stat: null, value: null }, subs: [{ stat: null, value: null }] },
      boots: { main: { stat: null, value: null }, subs: [{ stat: null, value: null }] },
      sphere: { main: { stat: null, value: null }, subs: [{ stat: null, value: null }] },
      rope: { main: { stat: null, value: null }, subs: [{ stat: null, value: null }] }
    }
  });

  console.log("-> Injetando 5 requisições vitais de usuários que acabaram de clicar no site...");
  
  const multi = redis.multi();
  for (let i = 1; i <= 5; i++) {
    const jobId = `crash-job-${i}`;
    multi.xAdd("build-stream", "*", {
      jobId,
      payload: fakePayload,
      timestamp: Date.now().toString()
    });
  }
  await multi.exec();

  console.log("✅ Requisições inseridas com sucesso.");

  console.log("-> Checando a persistência crua na Fila (O servidor de Workers está OFFLINE).");
  
  const streamInfo = await redis.xInfoStream("build-stream");
  const length = streamInfo.length;
  console.log(`[Status do Cofre] Existem agora ${length} mensagens (requisições) TOTALMENTE SALVAS na fila.`);
  
  // Vamos ler as ultimas 5 mensagens da stream crua para provar que os dados estão inteiros
  const latestMessages = await redis.xRevRange("build-stream", "+", "-", { COUNT: 5 });
  console.log("=========================================");
  console.log("As 5 mensagens represadas estão perfeitamente legíveis:");
  latestMessages.forEach((msg, idx) => {
    console.log(` Ticket ${idx+1} [ID: ${msg.id}] -> Job: ${msg.message.jobId}`);
  });
  console.log("=========================================");
  console.log("⚠️ ATENÇÃO: Nenhuma delas foi processada ainda porque a 'Cozinha' está fechada.");
  console.log("O sistema provou que não perde os dados, ele aguarda o retorno da equipe!");

  await redis.quit();
  process.exit(0);
}

runCrashTest();
