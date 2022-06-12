import path from 'path'
import { INVALID_ARGS, INVALID_INPUT, OPERATION_FAILED } from "./constants.js";

export const replacer = (str, replaceTo) => str.replace(/(\\)[a-z0-9_-]+$/gi, replaceTo)

export const commandsParcer = (command) => command.toString('utf-8').replace(/[\t\n\r]/g, '').split(' ')

export const getFileName = (str) => str.match(/([^\/\\]+\.\w+)$/gi)

export const getErrorMessage = (err) => {
  console.log(err.message);
   if(err.message === INVALID_ARGS) {
    console.log(INVALID_INPUT);
    return;
   }
   console.log(OPERATION_FAILED);
}

export const getPathsFromArgs = (args) => {
  const [pathToFile, newDirectory] = args;
  const [filename] = getFileName(pathToFile);
  const pathToNewFile = path.join(newDirectory, filename);

  return ({
    pathToFile,
    newDirectory,
    pathToNewFile
  })
}