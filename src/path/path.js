import fs from 'fs'
import path from 'path';
import { commands } from '../common/enum.js'

const getUpper = () => {
  const currentDirectory = process.cwd()
  console.log(currentDirectory)
  process.chdir(currentDirectory.replace(/(\\)[a-z0-9_-]+$/gi, '\\'))
}

const changePath = (path) => {
  console.log(path)
}

export const getPath = (command, path) => {
  switch(command){
    case commands.up:
      getUpper()
      break;
    case commands.cd:
      changePath(path)
      break; 
    case commands.ls:
      fs.readdir(process.cwd(), (err, files) => {
        console.log(files)
      })
      break;
  }

  return 'Testing'
}