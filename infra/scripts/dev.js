const { spawn, spawnSync } = require("node:child_process");

// Função auxiliar para rodar comandos síncronos (setup)
function runSync(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    console.error(`❌ Erro ao executar: ${command} ${args.join(" ")}`);
    process.exit(result.status);
  }
}

// Função para limpar os serviços (Docker Down/Stop)
function cleanup() {
  console.log("\n🛑 Encerrando ambiente de desenvolvimento...");
  spawnSync("npm", ["run", "services:stop"], { stdio: "inherit", shell: true });
  console.log("✅ Ambiente encerrado com sucesso.");
}

// 1. Captura sinais de encerramento (Ctrl+C, kill, etc)
// Isso garante que o cleanup rode mesmo se você cancelar o processo
process.on("SIGINT", () => {
  cleanup();
  process.exit(0);
});

process.on("SIGTERM", () => {
  cleanup();
  process.exit(0);
});

try {
  // 2. Inicia os serviços (Docker)
  console.log("🐳 Subindo containers...");
  runSync("npm", ["run", "services:up"]);

  // 3. Aguarda o Banco de Dados
  console.log("⏳ Aguardando banco de dados...");
  runSync("npm", ["run", "services:wait:database"]);

  // 4. Roda as Migrations
  console.log("📦 Rodando migrations...");
  runSync("npm", ["run", "migrations:up"]);

  // 5. Inicia o Next.js (Processo persistente)
  console.log("🚀 Iniciando Next.js...");
  const nextDev = spawn("next", ["dev"], { stdio: "inherit", shell: true });

  // Se o Next.js morrer por conta própria, rodamos o cleanup também
  nextDev.on("close", (code) => {
    cleanup();
    process.exit(code);
  });
} catch (error) {
  console.error("Erro fatal:", error);
  cleanup();
  process.exit(1);
}
