import fs from 'fs';
import zlib from 'zlib';
import { INVALID_ARGS } from '../common/constants.js';
import { getErrorMessage, getPathsFromArgs } from '../common/utils.js';
import { DIRECTORY_MESSAGE } from '../common/constants.js';

export const decompress = (args) => {
  if (args.length !== 2) throw new Error(INVALID_ARGS);

  const {pathToFile, pathToNewFile} = getPathsFromArgs(args);
  
  const gzip = zlib.createBrotliDecompress()
  const readStream = fs.createReadStream(pathToFile);
  const writeStream = fs.createWriteStream(`${pathToNewFile.replace(/.br$/g, '')}`);

  writeStream.on('finish', () => {
    console.log(DIRECTORY_MESSAGE(process.cwd()))
  })

  gzip.on('error', (err) => {
    getErrorMessage(err)
  })

  readStream.on('error', (err) => {
    getErrorMessage(err);
  })

  writeStream.on('error', (err) => {
    getErrorMessage(err);
  })

    
  readStream.pipe(gzip).pipe(writeStream);
};
