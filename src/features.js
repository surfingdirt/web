const PRODUCTION = 'production';

const features = {
  registration: true,
  translation: process.env.NODE_ENV !== PRODUCTION,
};

export default features;
