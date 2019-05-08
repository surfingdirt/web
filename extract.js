const { GettextExtractor, JsExtractors } = require('gettext-extractor');

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

extractor.savePotFile('./src/translations/template.pot');
