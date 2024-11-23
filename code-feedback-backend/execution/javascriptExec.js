// Executes JavaScript code in a Node.js environment
function executeJavaScriptCode(code) {
    return new Promise((resolve, reject) => {
      try {
        const result = eval(code);  // Execute the JavaScript code (unsafe, but for demo purposes)
        resolve(result);
      } catch (err) {
        reject('Error in JavaScript code: ' + err.message);
      }
    });
  }
  
  module.exports = { executeJavaScriptCode };
  