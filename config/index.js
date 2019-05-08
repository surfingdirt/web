const env = process.env.NODE_ENV || 'local';

export const port = 3033;

export const fragmentTypesFile = './fragmentTypes.json';

export const index = {
  local: {
    port,
    baseUrl: `http://localhost:${port}`,
    graphql: 'http://localhost:4000',
    showErrors: true,
  },
  production: {
    port,
    baseUrl: `https://beta.surfingdirt.com`,
    graphql: 'https://graphql.surfingdirt.com/',
    showErrors: false,
  },
}[env];
