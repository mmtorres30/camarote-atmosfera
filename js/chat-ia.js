// CHAT IA - ASSISTENTE ATMOSFERA
let conversationHistory = [];

async function handleChatMessage(userMessage) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userMessage,
        history: conversationHistory
      })
    });

    const data = await response.json();
    const reply = data.reply;

    conversationHistory.push({ role: "user", content: userMessage });
    conversationHistory.push({ role: "assistant", content: reply });
    if (conversationHistory.length > 20) {
      conversationHistory = conversationHistory.slice(-20);
    }

    return reply;
  } catch (error) {
    return "Desculpe, tive um problema! Fale conosco pelo WhatsApp: (21) 99991-2221 📱";
  }
}

window.handleChatMessage = handleChatMessage;
