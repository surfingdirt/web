const PRODUCTION = 'production';

const getFeatures = (forceDevFeatures) => {
  const isProduction = process.env.NODE_ENV === PRODUCTION;
  const isDev = !isProduction;

  const features = {
    firebaseAuth: true,
    fourDown: isDev || forceDevFeatures,
  };

  return features;
};

export default getFeatures;
