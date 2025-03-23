import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: '', // Substitua por sua API key válida
  dangerouslyAllowBrowser: true, // Necessário para React Native
});

export const falarComChatGPT = async (message) => {
  try {
    const response = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: message }], // Alterado para "user" em vez de "system"
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    return "Erro ao obter resposta. Tente novamente.";
  }
};
