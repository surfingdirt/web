import FormData from 'form-data';
import fetch from 'node-fetch';

import GraphQLError from '../src/error/graphqlError';

const checkStatus = (res) => {
  if (res.ok) {
    // res.status >= 200 && res.status < 300
    return res;
  } else {
    throw new GraphQLError(res.statusText);
  }
}

const fileUpload = async (graphqlUri, mutationAST, input, stream, fileInfo, token) => {
  const body = new FormData();
  body.append(
    'operations',
    JSON.stringify({
      query: mutationAST.loc.source.body,
      variables: {
        file: null,
        input,
      },
    }),
  );
  body.append('map', JSON.stringify({ '1': ['variables.file'] }));
  body.append('1', stream, fileInfo);

  const response = await fetch(graphqlUri, {
    method: 'POST',
    body,
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
      Authorization:
        `Bearer ${token}`,
    },
  });
  checkStatus(response)
  const creationResponseBody = await response.json();
  return creationResponseBody.data.createPhoto;
};

export default fileUpload;
