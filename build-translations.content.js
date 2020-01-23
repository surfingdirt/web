import fs from 'fs';
import { po } from 'gettext-parser';

const translationFolder = './src/translations';
const files = fs.readdirSync(translationFolder);
files.forEach((file) => {
  const extension = file.substr(-3, 3);
  const locale = file.substr(0, file.length - 3);
  if (extension !== '.po') {
    return;
  }
  console.log(`Building translations file for locale '${locale}'.`);
  try {
    const translations = JSON.stringify(
      po.parse(fs.readFileSync(`${translationFolder}/${file}`, 'utf8')),
    );
    const fileContent = `
/* ${locale} translations */    
window.translations = ${translations};

export default translations;
`;

    fs.writeFileSync(`${translationFolder}/translations-${locale}.po.js`, fileContent);
  } catch (e) {
    console.error('Error', e);
  }
});

console.log('Done building translations files.');
