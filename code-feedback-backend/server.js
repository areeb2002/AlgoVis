const express = require('express');
const bodyParser = require('body-parser');
const { executePythonCode } = require('./execution/pythonExec'); // Make sure this file exists
const { executeJavaScriptCode } = require('./execution/javascriptExec'); // Make sure this file exists
const { executeCCode } = require('./execution/cExec'); // Make sure this file exists
const { executeCppCode } = require('./execution/cppExec'); // Make sure this file exists
const { executeJavaCode } = require('./execution/javaExec'); // Make sure this file exists
const { fetchFeedbackFromGeminiAPI } = require('./api/geminiAPI'); // Updated function name
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to execute code
app.post('/execute-code', async (req, res) => {
  const { code, language } = req.body;
  
  try {
    let output = '';
    
    if (language === 'python') {
      output = await executePythonCode(code);
    } else if (language === 'javascript') {
      output = await executeJavaScriptCode(code);
    } else if (language === 'c') {
      output = await executeCCode(code);
    } else if (language === 'cpp') {
      output = await executeCppCode(code);
    } else if (language === 'java') {
      output = await executeJavaCode(code);
    } else {
      return res.status(400).json({ error: 'Unsupported language' });
    }

    res.json({ output });
  } catch (err) {
    console.error('Error executing code:', err);  // Log the error for debugging
    res.status(500).json({ error: 'Error executing code', message: err.message });
  }
});

// Endpoint to get feedback from Gemini API
app.post('/get-feedback', async (req, res) => {
  const { code } = req.body;

  try {
    const feedback = await fetchFeedbackFromGeminiAPI(code);  // Correct function name
    res.json({ feedback });
  } catch (error) {
    console.error('Error fetching feedback from Gemini API:', error);  // Log the error for debugging
    res.status(500).json({ error: 'Error fetching feedback from Gemini API', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
