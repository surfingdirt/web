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
    const query = actionInfo.mutation.loc.source.body;
    const input = req.body;
    const reqFile = actionInfo.hasFileUpload ? req.file : null;

    const variables = input;
    if (reqFile) {
      // Gotta have an entry
      variables.file = null;
    }

    const body = new FormData();
    body.append('operations', JSON.stringify({ query, variables }));
    if (reqFile) {
      const { originalname: filename, mimetype: contentType, size: knownLength } = reqFile;
      const fileInfo = { filename, contentType, knownLength };
      const file = fs.readFileSync(reqFile.path);
      body.append('map', JSON.stringify({ '1': ['variables.file'] }));
      body.append('1', file, fileInfo);
    } else {
      body.append('map', JSON.stringify({}));
    }

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      body,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    if (reqFile) {
      fs.unlinkSync(reqFile.path);
    }
    this.checkStatus(response);
    const responseBody = await response.json();
    // TODO: si responseBody conttient errors[], retourner la premiere erreur
    if (responseBody.errors) {
      const error = responseBody.errors[0];
      throw new GraphQLError(error.message, error.extensions.code);
    }
    return responseBody.data[actionInfo.responseKey];
  }

  checkStatus(res) {
    if (!res.ok) {
      // res.status < 200 || res.status >= 300
      throw new GraphQLError(res.statusText, 0);
    }
  }
}
