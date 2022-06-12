import fs from 'fs';
import { FILE_EXISTS, INVALID_ARGS } from '../common/constants.js';
import { getErrorMessage, getPathsFromArgs } from '../common/utils.js';
import { DIRECTORY_MESSAGE } from '../common/constants.js';

export const copy = (args) => {
  if (args.length !== 2) throw new Error(INVALID_ARGS);

  const { pathToFile, pathToNewFile} = getPathsFromArgs(args)
  
  if(fs.existsSync(pathToNewFile)) {
    throw new Error(FILE_EXISTS)
  }

  const readStream = fs.createReadStream(pathToFile, 'utf-8');
  const writeStream = fs.createWriteStream(pathToNewFile, 'utf-8');

  readStream.on('error', (err) => {
    getErrorMessage(err)
  })

  writeStream.on('error', (err) => {
    getErrorMessage(err)
  })

  writeStream.on('finish', () => {
    console.log(DIRECTORY_MESSAGE(process.cwd()))
  })

    readStream.pipe(writeStream)
}