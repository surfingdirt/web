const fs = require('fs');
const { GettextExtractor, JsExtractors } = require('gettext-extractor');

const OUTPUT_FOLDER = './src/translations';
const TEMPLATE_FILE = `${OUTPUT_FOLDER}/template.pot`;
const EN_US_FILE = `${OUTPUT_FOLDER}/en-US.po`;

const extractor = new GettextExtractor();

extractor
  .createJsParser([
    // See getText signature in the Translate component
    JsExtractors.callExpression(['getText'], {
      arguments: {
        text: 0,
        context: 1,
      },
    }),
    // See getPlural signature in the Translate component
    JsExtractors.callExpression(['getPlural'], {
      arguments: {
        text: 0,
        textPlural: 1,
        context: 3,
      },
    }),
  ])
  .parseFilesGlob('./src/**/*.@(js|jsx)');

extractor.savePotFile(TEMPLATE_FILE);
fs.copyFileSync(TEMPLATE_FILE, EN_US_FILE);
