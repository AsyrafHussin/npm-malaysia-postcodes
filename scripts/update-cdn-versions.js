import { createRequire } from 'module';
import fs from 'fs';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

function updateCDNLinks(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const updatedContent = content.replace(/@(\d+\.\d+\.\d+)/g, `@${version}`);
  fs.writeFileSync(`${filename}`, updatedContent, 'utf8');
}

updateCDNLinks('README.md');
updateCDNLinks('examples/script-tag/index.html');
