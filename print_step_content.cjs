const fs = require('fs');

const path = 'C:\\Users\\Rohit\\.gemini\\antigravity-ide\\brain\\39d05848-3bf9-4644-9764-19f63160cc88\\step_34_raw.txt';
if (fs.existsSync(path)) {
  const content = fs.readFileSync(path, 'utf8');
  console.log('File Length:', content.length);
  console.log('First 2000 chars:\n', content.substring(0, 2000));
} else {
  console.log('File does not exist.');
}
