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
      let variables;
      if (input.id) {
        const { id, ...actualInput } = input;
        variables = { id, input: actualInput };
      } else {
        variables = { input };
      }
      body.append('operations', JSON.stringify({ query, variables }));
      body.append('map', JSON.stringify({}));
      response = await this.fetch(body);
    }
    const responseBody = await response.json();
    if (responseBody.errors) {
      const { message, extensions } = responseBody.errors[0];
      let errors = {};
      if (extensions.exception && extensions.exception.errors) {
        errors = extensions.exception.errors;
      }
      throw new GraphQLError(message, extensions.code, errors);
    }
    return responseBody.data[actionInfo.responseKey];
  }

  async fetch(body) {
    const headers = {
      Accept: 'application/json',
    };
    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }
    return fetch(this.graphqlUrl, {
      method: 'POST',
      body,
      headers,
    });
  }
}
