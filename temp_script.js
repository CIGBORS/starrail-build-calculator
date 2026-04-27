const fs = require('fs');
const data = fs.readFileSync('C:\\Users\\Administrador\\.gemini\\antigravity\\brain\\cb5d6f69-e7a1-4aef-994d-fc5e84abc2c5\\.system_generated\\steps\\139\\content.md', 'utf-8');
const jsonStr = data.split('---')[1].trim();
const chars = JSON.parse(jsonStr);
for (let key in chars) {
  if (parseInt(key) > 1300 || parseInt(key) >= 1200 && parseInt(key) <= 1299 || parseInt(key) >= 8000) {
    console.log(`ID: ${key}, Name: ${chars[key].name}, Element: ${chars[key].element}`);
  }
}
