const PRODUCTION = 'production';

const getFeatures = (forceDevFeatures) => {
  const isProduction = process.env.NODE_ENV === PRODUCTION || forceDevFeatures;
  const isDev = !isProduction;

  const features = {
    firebaseAuth: true,
    fourDown: isProduction,
  };
  console.log({ features });

  return features;
};

export default getFeatures;
