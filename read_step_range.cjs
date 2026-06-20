const fs = require('fs');

const logPath = 'C:\\Users\\Rohit\\.gemini\\antigravity-ide\\brain\\39d05848-3bf9-4644-9764-19f63160cc88\\.system_generated\\logs\\transcript.jsonl';
const fileContent = fs.readFileSync(logPath, 'utf8');
const lines = fileContent.split('\n');

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.step_index >= 30 && obj.step_index <= 60) {
      if (obj.tool_calls) {
        obj.tool_calls.forEach(tc => {
          console.log(`Step ${obj.step_index}: Tool=${tc.name}`);
          const args = tc.args;
          const target = args.TargetFile || args.targetFile || args.CommandLine;
          if (target) {
            console.log(`  Target/Command: ${target}`);
          }
        });
      }
    }
  } catch (err) {
    // ignore
  }
}
