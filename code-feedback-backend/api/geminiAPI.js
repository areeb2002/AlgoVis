const axios = require('axios');
require('dotenv').config();

async function fetchFeedbackFromGeminiAPI(code, language) {
  const apiKey = AIzaSyDzBdun-CFlwxRaqsAqK4WvOo4taOheZ3Y;
  if (!apiKey) {
    throw new Error('Gemini API key not configured');
  }

  const prompt = `Analyze this ${language} code and provide feedback on:
1. Time complexity
2. Space complexity
3. Code quality and best practices
4. Potential improvements

Code:
${code}`;

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText',
      {
        contents: [{ text: prompt }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    return response.data.candidates[0].content.text;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    throw new Error('Failed to get code feedback');
  }
}

module.exports = { fetchFeedbackFromGeminiAPI };
