const PRODUCTION = 'production';

const isProduction = process.env.NODE_ENV === PRODUCTION;
const isDev = !isProduction;

const features = {
  firebaseAuth: true,
};

export default features;
