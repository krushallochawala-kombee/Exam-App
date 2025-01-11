import axios from 'axios';

const API_KEY = 'LZp6RHba4NynNs6NsjgrLLkWBPklQQAYtn9j5NUg';
const API_URL = 'https://api.cohere.ai/generate';

export const generateQuestion = async (topic) => {
    try {
      const response = await axios.post(
        API_URL,
        {
          model: 'command-r-plus', 
          prompt: `Generate a random multiple-choice question on ${topic}.`,
          max_tokens: 100,
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json', // Ensure the content type is set
          },
        }
      );
      return response.data.text.trim(); // Adjusted for Cohere's response structure
    } catch (error) {
      console.error("Error generating question:", error);
      return null;
    }
  };

export const checkAnswer = async (question, userAnswer) => {
    debugger;
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'command-r-plus',
        prompt: `Check if the answer "${userAnswer}" is correct for the question: ${question}`,
        max_tokens: 50,
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.text.trim();
  } catch (error) {
    console.error("Error checking answer:", error);
    return null;
  }
};
