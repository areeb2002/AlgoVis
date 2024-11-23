const { exec } = require('child_process');
const fs = require('fs');

function executeCppCode(code) {
  return new Promise((resolve, reject) => {
    const tempFileName = 'temp.cpp';
    fs.writeFileSync(tempFileName, code);

    exec(`g++ ${tempFileName} -o temp && ./temp`, (error, stdout, stderr) => {
      fs.unlinkSync(tempFileName); // Remove temporary file
      if (error) {
        reject(stderr || 'Compilation or execution error occurred');
      } else {
        resolve(stdout); // Return execution output
      }
    });
  });
}
module.exports = { executeCppCode };
