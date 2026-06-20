const fs = require('fs');

const path = 'C:\\Users\\Rohit\\.gemini\\antigravity-ide\\brain\\39d05848-3bf9-4644-9764-19f63160cc88\\style_history.txt';
if (fs.existsSync(path)) {
  const content = fs.readFileSync(path, 'utf8');
  const keywords = ['.center-container', '.flip-card', '.flip-card-inner', '.flip-card-front', '.flip-card-back', 'is-centered'];
  
  keywords.forEach(keyword => {
    let idx = 0;
    console.log(`=== Matches for ${keyword} ===`);
    while ((idx = content.indexOf(keyword, idx)) !== -1) {
      console.log(content.substring(Math.max(0, idx - 50), Math.min(content.length, idx + 350)));
      console.log('------------------------\n');
      idx += keyword.length;
    }
  });
} else {
  console.log('style_history.txt does not exist.');
}
