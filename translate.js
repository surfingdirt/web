const yargs = require('yargs');
const translateGettext = require('./src/utils/translate/translateGettext.js');

const invokeArguments = yargs
  .usage('Usage: translate [options]')
  .example(
    'translate -in=messages_de_de.po -out=messages_de_de -f -o',
    'Writes all missing translations as fuzzy msgstrs into messages_de_de.' +
      ' Overwrites fuzzy messages.',
  )
  .boolean(['o', 'f'])
  .default('fuzzy', false)
  .default('overwrite', false)
  .alias('o', 'overwrite')
  .alias('f', 'fuzzy')
  .alias('in', 'input')
  .alias('out', 'output')
  .describe('apiKey', 'DeepL API key')
  .describe('in', 'Relative path to input file')
  .alias('out', 'Relative path to output file')
  .describe('f', 'Mark added translation as fuzzy')
  .describe('o', 'Overwrite existing translations if they are marked as fuzzy')
  .demandOption(['apiKey', 'input', 'output'])
  .help('h')
  .alias('h', 'help').argv;

console.log(`translating .po file: ${invokeArguments.input}`);

const callback = () => {
  console.log(`writing to file: ${invokeArguments.output}`);
};

const { apiKey, input, fuzzy, overwrite, output } = invokeArguments;

translateGettext(apiKey, input, fuzzy, overwrite, callback, output);
