'use strict';

const { get } = require('https');
const { join } = require('path');
const { promisify } = require('util');
const { writeFile } = require('fs');

const write = promisify(writeFile);

/**
 * Fetch a URL.
 *
 * @param {String} url The URL to fetch
 * @return {Promise<String>} A Promise that resolves with the URL content
 * @private
 */
function fetch(url) {
  return new Promise((resolve, reject) => {
    const request = get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Unexpected status code: ${response.statusCode}`));
        return;
      }

      const chunks = [];
      let length = 0;

      response.on('data', (chunk) => {
        length += chunk.length;
        chunks.push(chunk);
      });

      response.on('end', () => {
        resolve(Buffer.concat(chunks, length).toString());
      });
    });

    request.on('error', reject);
  });
}

const baseUrl =
  'https://raw.githubusercontent.com/meteor/meteor/devel/packages';

Promise.all(
  ['base64.js', 'ejson.js', 'stringify.js', 'utils.js'].map(
    async (file, index) => {
      const url = `${baseUrl}/${index === 0 ? 'base64' : 'ejson'}/${file}`;
      await write(join(__dirname, file), await fetch(url));
    }
  )
).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
