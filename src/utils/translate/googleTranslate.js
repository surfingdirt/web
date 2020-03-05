const { Translate } = require('@google-cloud/translate').v2;
const { googleTranslationProjectId } = require('../../../config/translations');

const translate = async (apiKey, translationKey, sourceLanguage, destinationLanguage) => {
  const googleTranslate = new Translate({ projectId: googleTranslationProjectId });
  const options = {
    from: sourceLanguage.toLowerCase(),
    to: destinationLanguage.toLowerCase(),
  };

  try {
    const response = await googleTranslate.translate(translationKey, options);
    const [translation] = response;
    return translation;
  } catch (e) {
    console.error(e);
    return null;
  }
};

module.exports = (apiKey, message, sourceLanguage, destinationLanguage, callback) => {
  translate(apiKey, message, sourceLanguage, destinationLanguage)
    .then((translated) => {
      console.log('Received response:', translated);
      if (!translated) {
        throw new Error('No translation found');
      }
      callback(null, translated);
    })
    .catch((error) => {
      callback(error, null);
    });
};
