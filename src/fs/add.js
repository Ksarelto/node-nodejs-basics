import fs from 'fs';
import path from 'path'
import { INVALID_ARGS, FILE_EXISTS } from '../common/constants.js';
import { getErrorMessage } from '../common/utils.js';
import { DIRECTORY_MESSAGE } from '../common/constants.js';

export const add = (fileName) => {
  if (fileName.length !== 1) throw new Error(INVALID_ARGS);

  const [name] = fileName

  if(fs.existsSync(path.join(process.cwd(), name))) {
    throw new Error(FILE_EXISTS)
  }

  const writeStream = fs.createWriteStream(name, 'utf-8')

  writeStream.on('error', (err) => {
    getErrorMessage(err)
  })

  console.log(DIRECTORY_MESSAGE(process.cwd()))
};
