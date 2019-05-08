/* eslint-disable no-underscore-dangle, no-console */

/**
 * This file is responsible for fetching and saving the GraphQL schema as a JSON file so that it
 * can be fed to the Apollo client cache.
 * @see https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
 */

require('@babel/polyfill');
require('@babel/register')();

const fetch = require('isomorphic-fetch');
const fs = require('fs');
const { index, fragmentTypesFile } = require('../config/index');

const fetchData = async () => {
  const { graphql } = index;

  return fetch(`${graphql}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {},
      query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
    }),
  });
};

const writeJSONFile = (data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(fragmentTypesFile, JSON.stringify(data), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

(async () => {
  try {
    const { data } = await fetchData().then((result) => result.json());

    // Filter out any type information unrelated to unions or interfaces
    data.__schema.types = data.__schema.types.filter((type) => type.possibleTypes !== null);

    await writeJSONFile(data);
    console.log('Fragment types info written successfully.');
  } catch (e) {
    console.log(
      'An error occurred while fetching and saving fragment types info. Proceeding with empty file.',
      e,
    );
    await writeJSONFile(null);
  }
})();
