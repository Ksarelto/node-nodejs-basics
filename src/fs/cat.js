import fs, { createReadStream } from 'fs';
import { INVALID_ARGS } from '../common/constants.js';
import { getErrorMessage } from '../common/utils.js';
import { DIRECTORY_MESSAGE } from '../common/constants.js';

export const cat = (path) => {
  if (path.length !== 1) throw new Error(INVALID_ARGS);

  const readStream = createReadStream(path[0], 'utf-8')

  readStream.on('data', (chunk) => {
    process.stdout.write(chunk)
  })

  readStream.on('end', () => {
    console.log(DIRECTORY_MESSAGE(process.cwd()))
  })

  readStream.on('error', (err) => {
   getErrorMessage(err)
  })
};