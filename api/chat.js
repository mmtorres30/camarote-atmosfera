export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  const { message, history } = req.body;
  const groqKey = process.env.GROQ_KEY;

  if (!groqKey) {
    return res.status(200).json({ reply: "⚠️ GROQ_KEY não encontrada." });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `Você é o Assistente Atmosfera, assistente virtual do Camarote Atmosfera — camarote VIP premium no Sambódromo da Sapucaí, Carnaval 2027 Rio de Janeiro. Seja simpático, elegante e use emojis de carnaval ocasionalmente 🎭

SOBRE O CAMAROTE:
- Camarote VIP premium no Sambódromo da Sapucaí
- Boate Atmosfera: 400m², primeira boate com vista panorâmica da Sapucaí
- Som e luz de alto nível, isolamento acústico, produção de ponta

INGRESSOS:
- Série Ouro Sexta 05/02/2027: R$ 1.340
- Série Ouro Sábado 06/02/2027: R$ 1.540
- Grupo Especial Domingo 07/02/2027: R$ 2.790
- Grupo Especial Segunda 08/02/2027: R$ 2.790
- Grupo Especial Terça 09/02/2027: R$ 2.790
- Campeãs Sábado 13/02/2027: R$ 2.790
- Reservados Corporativos: espaços para grupos de 20 pessoas

CREDENCIAMENTO:
- Local: Novotel Barra da Tijuca — Av. Embaixador Abelardo Bueno, 1.511
- Período: 01/02 a 13/02/2027

CONTATO E COMPRAS:
- WhatsApp: (21) 99991-2221
- Site: camaroteatmosfera.com.br

REGRAS IMPORTANTES:
- Responda SEMPRE em português
- Para compras e reservas, direcione ao WhatsApp (21) 99991-2221
- Se perguntarem sobre atrações, DJs ou line-up: diga que em breve serão divulgados e sugira seguir nas redes ou entrar em contato pelo WhatsApp
- Se não souber algo, diga educadamente que não tem essa informação ainda e passe o WhatsApp
- Respostas curtas e objetivas
- Nunca invente informações`
          },
          ...(history || []),
          { role: "user", content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.choices && data.choices[0]) {
      return res.status(200).json({ reply: data.choices[0].message.content });
    } else {
      return res.status(200).json({ reply: "Erro inesperado. WhatsApp: (21) 99991-2221 📱" });
    }

  } catch (error) {
    return res.status(200).json({ reply: "Erro: " + error.message });
  }
}
