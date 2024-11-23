const { exec } = require('child_process');

function executePythonCode(code) {
  return new Promise((resolve, reject) => {
    const pythonProcess = exec(`python -c "${code}"`, (err, stdout, stderr) => {
      if (err) reject(stderr);
      else resolve(stdout);
    });
  });
}

module.exports = { executePythonCode };
