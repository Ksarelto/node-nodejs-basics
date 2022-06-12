import os from 'os'
import { INVALID_ARGS } from '../common/constants.js';
import { cliArguments } from '../common/enum.js';
import { getErrorMessage } from '../common/utils.js';
import { DIRECTORY_MESSAGE } from '../common/constants.js';

const parsedCPUS = () => {
  const cpus = os.cpus();
  console.log(`CPUS's amout is: ${cpus.length}`)
  console.log('CPU`s:')
  cpus.forEach((c) => {
    console.log(`Model: ${c.model} Speed: ${Math.round(c.speed) / 1000}GHz`)
  })
}

export const osOperations = (args) => {
 try {
  if(args.length > 1 || !args.length) throw new Error(INVALID_ARGS)
  const [arg] = args; 

  switch(arg) {
    case cliArguments.EOL:
     console.log(os.EOL.split(''))
      break;
    case cliArguments.cpus:
      parsedCPUS()
      break;
    case cliArguments.homedir:
      console.log(os.homedir())
      break;
    case cliArguments.username:
      console.log(os.userInfo().username)
      break;
    case cliArguments.architecture:
      console.log(os.arch())
      break;
  }
  console.log(DIRECTORY_MESSAGE(process.cwd()))
 } catch (err) {
  getErrorMessage(err)
 }
}