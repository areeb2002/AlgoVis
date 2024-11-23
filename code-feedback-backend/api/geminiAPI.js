const axios = require('axios');

// Function to get feedback from Gemini API
async function fetchFeedbackFromGeminiAPI(code) {
  const apiUrl = 'https://gemini-api-endpoint.com/analyze';  // Replace with the actual Gemini API endpoint
  
  const requestBody = {
    code: code,
    prompt: "Analyze the following code and provide feedback in the following format:\n1. Time complexity\n2. Space complexity\n3. List the drawbacks in the code in 3 bullet points\n4. Suggest improvements in the code in 2-3 bullet points"
  };
  
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Authorization': 'Bearer YOUR_GEMINI_API_KEY',
        'Content-Type': 'application/json'
      }
    });

    return response.data.feedback;  // Gemini should return the feedback
  } catch (error) {
    console.error("Error fetching feedback from Gemini API:", error);
    throw error;
  }
}

module.exports = { fetchFeedbackFromGeminiAPI };
