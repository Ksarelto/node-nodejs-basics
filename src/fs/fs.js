import fs from 'fs'
import { commands } from '../common/enum.js'

const fileSystemOperations = (command, args) => {
  switch(command){
    case commands.cat:
      
      break;
    case commands.add:
      changePath(path)
      break; 
    case commands.rm:
      changePath(path)
       break; 
    case commands.mv:
      changePath(path)
      break;
    case commands.cp:
      changePath(path)
      break; 
    case commands.rn:
      fs.readdir(process.cwd(), (err, files) => {
        console.log(files)
      })
      break;
  }
}