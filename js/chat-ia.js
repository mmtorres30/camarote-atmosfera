
// ============================================
// CHAT IA - ASSISTENTE ATMOSFERA (Groq)
// ============================================

const GROQ_API_KEY = window.GROQ_KEY || "";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `Você é o Assistente Atmosfera, o assistente virtual oficial do Camarote Atmosfera — um camarote VIP premium no Sambódromo da Sapucaí para o Carnaval 2027 no Rio de Janeiro.

Seja simpático, elegante e use emojis de carnaval ocasionalmente 🎭🥁✨

INFORMAÇÕES DO CAMAROTE:
- Local: Sambódromo da Sapucaí, Rio de Janeiro
- Carnaval 2027

INGRESSOS E VALORES:
- Série Ouro Sexta 05/02: R$ 1.340
- Série Ouro Sábado 06/02: R$ 1.540
- Grupo Especial Dom 07/02: R$ 2.790
- Grupo Especial Seg 08/02: R$ 2.790
- Grupo Especial Ter 09/02: R$ 2.790
- Campeãs Sáb 13/02: R$ 2.790

RESERVADOS CORPORATIVOS: para grupos de 20 pessoas

CREDENCIAMENTO:
- Local: Novotel Barra da Tijuca — Av. Embaixador Abelardo Bueno, 1.511
- Período: 01/02 a 13/02/2027

CONTATO E COMPRAS:
- WhatsApp: (21) 99991-2221
- Site: camaroteatmosfera.com.br

REGRAS:
- Responda SEMPRE em português
- Para compras, direcione para o WhatsApp (21) 99991-2221
- Se não souber algo, diga que vai verificar e passe o WhatsApp
- Respostas curtas e objetivas
- Nunca invente informações`;

async function sendMessageToGroq(userMessage, conversationHistory) {
  try {
    const messages = [
      ...conversationHistory,
      { role: "user", content: userMessage }
    ];

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) throw new Error("Erro na API");
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Erro Groq:", error);
    return "Desculpe, tive um problema técnico! Entre em contato pelo WhatsApp (21) 99991-2221 🎭";
  }
}

// Histórico da conversa
let conversationHistory = [];

// Substituir a função de envio de mensagem existente
async function handleChatMessage(userMessage) {
  const response = await sendMessageToGroq(userMessage, conversationHistory);
  
  // Salvar no histórico (máximo 10 mensagens para não estourar tokens)
  conversationHistory.push({ role: "user", content: userMessage });
  conversationHistory.push({ role: "assistant", content: response });
  if (conversationHistory.length > 20) {
    conversationHistory = conversationHistory.slice(-20);
  }
  
  return response;
}

// Expor globalmente
window.handleChatMessage = handleChatMessage;
window.conversationHistory = conversationHistory;
