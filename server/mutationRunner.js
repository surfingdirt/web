import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

import GraphQLError from '../src/error/graphqlError';

export default class MutationRunner {
  constructor(graphqlUrl, accessToken, debug = false) {
    this.graphqlUrl = graphqlUrl;
    this.debug = debug;
    this.accessToken = accessToken;
  }

  async run(actionInfo, req) {
    if (actionInfo.handler) {
      const response = await actionInfo.handler(req, this);
      console.log('handler', { req, response });
      return response;
    }

    const query = actionInfo.mutation.loc.source.body;
    const { hasFileUpload } = actionInfo;
    const reqFile = hasFileUpload ? req.file : null;

    const input = req.body;
    const body = new FormData();

    let response;
    if (hasFileUpload) {
      // Gotta have an entry for file
      const variables = { input, file: null };
      body.append('operations', JSON.stringify({ query, variables }));
      const { originalname: filename, mimetype: contentType, size: knownLength } = reqFile;
      const fileInfo = { filename, contentType, knownLength };
      const file = fs.readFileSync(reqFile.path);
      body.append('map', JSON.stringify({ '1': ['variables.file'] }));
      body.append('1', file, fileInfo);
      response = await this.fetch(body);
      fs.unlinkSync(reqFile.path);
    } else {
      const variables = { input };
      body.append('operations', JSON.stringify({ query, variables }));
      body.append('map', JSON.stringify({}));
      response = await this.fetch(body);
    }

    this.checkStatus(response);
    const responseBody = await response.json();
    if (responseBody.errors) {
      const error = responseBody.errors[0];
      throw new GraphQLError(error.message, error.extensions.code);
    }
    return responseBody.data[actionInfo.responseKey];
  }

  async fetch(body) {
    return fetch(this.graphqlUrl, {
      method: 'POST',
      body,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  checkStatus(res) {
    if (!res.ok) {
      // res.status < 200 || res.status >= 300
      throw new GraphQLError(res.statusText, 0);
    }
  }
}
