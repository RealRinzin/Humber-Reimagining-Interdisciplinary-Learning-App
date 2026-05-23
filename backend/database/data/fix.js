const fs = require('fs');

let text = fs.readFileSync('ramblings.json', 'utf8');

text = text.replace(/"code":"([\s\S]*?)"\s*([}\]])/g, (match, code, ending) => {
  const escaped = code
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '')
    .replace(/\t/g, '\\t')
    .replace(/"/g, '\\"');

  return `"code":"${escaped}"${ending}`;
});

fs.writeFileSync('ramblings-fixed.json', text);
console.log('Fixed JSON written to fixed.json');