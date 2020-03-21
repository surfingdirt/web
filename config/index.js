const env = process.env.NODE_ENV || 'local';

export const title = 'Surfing Dirt';
export const fbAppId = '1726273124340058';
export const fragmentTypesFile = './fragmentTypes.json';
export const analyticsId = 'UA-84394442-2';

export const config = {
  local: {
    port: 3033,
    baseUrl: `http://localhost:3033/`,
    // graphql: 'http://localhost:4000',
    graphql: 'https://graphql.surfingdirt.com/',
    galleryAlbumId: 'a3833b1c-1db0-4a93-9efc-b6659400ce9f',
    showErrors: true,
    tracing: {
      alwaysDisabled: false,
      traceAllRequests: false,
      traceFields: false,
      endpoint: 'http://localhost:9411/api/v2/spans',
      serviceName: 'node-dev',
    },
  },
  beta: {
    port: 8002,
    baseUrl: `https://beta.surfingdirt.com`,
    graphql: 'https://beta-graphql.surfingdirt.com/',
    galleryAlbumId: 'a3833b1c-1db0-4a93-9efc-b6659400ce9f',
    showErrors: false,
    tracing: {
      alwaysDisabled: false,
      traceAllRequests: false,
      traceFields: false,
      endpoint: 'https://beta-z.surfingdirt.com/api/v2/spans',
      serviceName: 'node-beta',
    },
  },
  production: {
    port: 8001,
    baseUrl: `https://www.surfingdirt.com`,
    graphql: 'https://graphql.surfingdirt.com/',
    galleryAlbumId: 'a3833b1c-1db0-4a93-9efc-b6659400ce9f',
    showErrors: false,
    tracing: {
      alwaysDisabled: false,
      traceAllRequests: false,
      traceFields: false,
      endpoint: 'https://z.surfingdirt.com/api/v2/spans',
      serviceName: 'node-prod',
    },
  },
}[env];
