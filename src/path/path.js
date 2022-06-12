import fs from 'fs'
import { DIRECTORY_MESSAGE, INVALID_ARGS, INVALID_INPUT, OPERATION_FAILED } from '../common/constants.js'
import { commands } from '../common/enum.js'
import { getErrorMessage, replacer } from '../common/utils.js'

const getUpper = () => {
  const currentDirectory = process.cwd()
  process.chdir(replacer(currentDirectory, '\\'))
  console.log(DIRECTORY_MESSAGE(process.cwd()))
}

const setPath = (path) => {
  process.chdir(path[0])
  console.log(DIRECTORY_MESSAGE(process.cwd()))
}

const getFilesList = () => {
  fs.readdir(process.cwd(), (err, files) => {
    console.log(files)
    console.log(DIRECTORY_MESSAGE(process.cwd()))
  })
}

export const pathOperations = (command, path) => {
  try {
    if (path.length > 1) throw new Error(INVALID_ARGS)

    switch(command){
      case commands.up:
        getUpper();
        break;
      case commands.cd:
        setPath(path);
        break; 
      case commands.ls:
        getFilesList();
        break;
    }
  } catch(err) {
    getErrorMessage(err)
  }
}