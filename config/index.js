const env = process.env.NODE_ENV || 'local';

export const port = 3033;

export const fragmentTypesFile = './fragmentTypes.json';

export const config = {
  local: {
    port,
    baseUrl: `http://localhost:${port}`,
    graphql: 'http://localhost:4000',
    galleryAlbumId: 'a3833b1c-1db0-4a93-9efc-b6659400ce9f',
    showErrors: true,
  },
  production: {
    port,
    baseUrl: `https://beta.surfingdirt.com`,
    graphql: 'https://graphql.surfingdirt.com/',
    galleryAlbumId: '',
    showErrors: false,
  },
}[env];
