const baseUrls = {
  beta: 'https://beta.surfingdirt.com/',
  local: 'http://localhost:3033/',
  production: 'https://www.surfingdirt.com/',
};

const baseUrl = baseUrls[process.env.NODE_ENV];

if (!baseUrl) {
  throw new Error(`No baseUrl set for NODE_ENV='${process.env.NODE_ENV}'`);
}

module.exports = baseUrl;
