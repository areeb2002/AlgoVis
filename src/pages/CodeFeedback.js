import React, { useState } from "react";
import "../css/CodeFeedback.css";
import axios from "axios";

const CodeFeedback = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleRunCode = async () => {
    try {
      // Sending code execution request to the backend
      const response = await axios.post("/execute-code", {
        code,
        language,
      });
      setOutput(response.data.output || "No output");
    } catch (error) {
      setOutput("Error running code");
    }
  };
  

  const handleGetFeedback = async () => {
    try {
      // Sending request to your backend to get feedback from Gemini API
      const response = await axios.post("/get-feedback", { code });
      setFeedback(response.data.feedback || "No feedback available");
    } catch (error) {
      setFeedback("Error fetching feedback");
    }
  };

  return (
    <div className="code-feedback">
      <h2>Code Execution & Feedback Generator</h2>
      <div className="code-container">
        <div className="code-input">
          <div className="code-header">
            <h3>Write Your Code:</h3>
            <select
              className="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
          </div>
          <textarea
            placeholder="Write your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
          <div className="buttons">
            <button onClick={handleRunCode}>Run Code</button>
            <button onClick={handleGetFeedback}>Get Feedback</button>
          </div>
        </div>

        <div className="right-container">
          <div className="output-container">
            <h3>Output:</h3>
            <div>{output}</div>
          </div>

          <div className="feedback-container">
            <h3>Feedback:</h3>
            <div>{feedback}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeFeedback;
