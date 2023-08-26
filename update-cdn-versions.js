const fs = require('fs');
const { version } = require('./package.json');

function updateCDNLinks(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const updatedContent = content.replace(/@(\d+\.\d+\.\d+)/g, `@${version}`);
  fs.writeFileSync(filename, updatedContent, 'utf8');
}

updateCDNLinks('README.md');
updateCDNLinks('examples/script-tag/index.html');
