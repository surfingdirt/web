const PRODUCTION = 'production';

const features = {
  registration: process.env.NODE_ENV !== PRODUCTION,
};

export default features;
