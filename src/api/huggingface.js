import axios from "axios";

const HF_API_KEY = process.env.REACT_APP_HF_API_KEY;

export const generateAIResponse = async (userMessage) => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
      {
        inputs: userMessage,
        parameters: {
          max_new_tokens: 180,
          temperature: 0.7,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Extract text from HF output
    if (response.data && response.data[0]?.generated_text) {
      return response.data[0].generated_text;
    }

    return "Sorry, I couldn't understand that.";
  } catch (error) {
    console.error("Hugging Face API Error:", error);
    return "⚠ AI service is unavailable right now. Please try again later.";
  }
};
