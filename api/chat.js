import Anthropic from "@anthropic-ai/sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { message, history } = req.body;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: `Você é o Assistente Atmosfera, assistente virtual do Camarote Atmosfera — camarote VIP premium no Sambódromo da Sapucaí, Carnaval 2027 Rio de Janeiro. Seja simpático e elegante 🎭

INGRESSOS:
- Série Ouro Sex 05/02: R$ 1.340
- Série Ouro Sáb 06/02: R$ 1.540  
- Grupo Especial Dom 07/02, Seg 08/02, Ter 09/02, Campeãs 13/02: R$ 2.790
- Reservados Corporativos: grupos de 20 pessoas

CREDENCIAMENTO: Novotel Barra da Tijuca — Av. Embaixador Abelardo Bueno, 1.511 — 01/02 a 13/02/2027
CONTATO: WhatsApp (21) 99991-2221 | camaroteatmosfera.com.br

REGRAS: Responda SEMPRE em português. Para compras direcione ao WhatsApp. Respostas curtas e objetivas.`
          },
          ...(history || []),
          { role: "user", content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({ reply: "Desculpe, tive um problema técnico! Fale conosco pelo WhatsApp: (21) 99991-2221 📱" });
  }
}
