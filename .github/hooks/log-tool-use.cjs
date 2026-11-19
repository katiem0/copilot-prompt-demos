const fs = require('node:fs');
const path = require('node:path');

const event = JSON.parse(fs.readFileSync(0, 'utf8'));
if (typeof event.toolName !== 'string') {
  throw new Error('Expected a Copilot preToolUse event with toolName.');
}
fs.appendFileSync(
  path.join(__dirname, 'tool-use.log'),
  `${JSON.stringify(event.toolName)}\n`
);
process.stdout.write('{}');
