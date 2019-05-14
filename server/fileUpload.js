import FormData from 'form-data';
import fetch from 'node-fetch';

const fileUpload = async (graphqlUri, input, stream, fileInfo) => {
  const body = new FormData();
  body.append(
    'operations',
    JSON.stringify({
      query: /* GraphQL */ `
        mutation createPhoto($input: PhotoCreationInput!, $file: Upload!) {
          createPhoto(input: $input, file: $file) {
            id
          }
        }
      `,
      variables: {
        file: null,
        input,
      },
    }),
  );
  body.append('map', JSON.stringify({ '1': ['variables.file'] }));
  body.append('1', stream, fileInfo);

  const ret = await fetch(graphqlUri, {
    method: 'POST',
    body,
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTc5MDg1ODksInVpZCI6IjYwYmZiOGE3LTU3NTQtNDE4Ni1hY2QyLTQ0YjIwZWYzMjM5OSJ9.5r0pO1qxoOfKczu_MqR4K8mmFeWatWSNoT64y99L2yo',
    },
  });
  const creationResponseBody = await ret.json();
  return creationResponseBody.data.createPhoto;
};

export default fileUpload;
