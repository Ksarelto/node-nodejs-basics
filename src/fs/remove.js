import fs from 'fs';
import { INVALID_ARGS } from '../common/constants.js';
import { DIRECTORY_MESSAGE } from '../common/constants.js';

export const remove = (path) => {
  if (path.length !== 1) throw new Error(INVALID_ARGS);

  fs.rmSync(path[0])

  console.log(DIRECTORY_MESSAGE(process.cwd()))
};
