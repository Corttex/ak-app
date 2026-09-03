const fetch = require('node-fetch');

async function testWebhook() {
  const args = process.argv.slice(2);
  const indicadoPor = args[0] || 'teste-local';

  const payload = {
    nome: "Eleitor Fictício " + Math.floor(Math.random() * 1000),
    telefone: "619" + Math.floor(Math.random() * 100000000),
    cidade: "Brasília",
    indicado_por: indicadoPor
  };

  console.log("➡️ Enviando payload:", payload);

  try {
    const res = await fetch('http://localhost:3001/api/webhooks/elegis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    console.log("✅ Resposta da API:", data);
  } catch(e) {
    console.error("❌ Erro:", e.message);
  }
}

testWebhook();
