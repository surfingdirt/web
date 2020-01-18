const contentBaseUrls = {
  beta: 'https://apibetasurfingdirt.b-cdn.net',
  local: 'http://localhost:3033',
  production: 'https://apisurfingdirt.b-cdn.net',
};

const contentBaseUrl = contentBaseUrls[process.env.NODE_ENV];

if (!contentBaseUrl) {
  throw new Error(`No baseUrl set for NODE_ENV='${process.env.NODE_ENV}'`);
}

module.exports = contentBaseUrl;
