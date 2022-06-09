import fs from 'fs'
import { pipeline, Transform } from 'stream';
import { commands } from './common/enum.js';
import { getPath } from './path/path.js';

const parseCommand = (command) => {
  const systemCall = command.toString().replace(/[\t\n\r]/g, '').split(' ');
  const [system, ...props] = systemCall;
  switch(system){
    case commands.cd:
    case commands.ls:
    case commands.up:
      getPath(system, props);
      break;
    case commands.cat:
    case commands.add:
    case commands.rn:
    case commands.cp:
    case commands.rm:
    case commands.mv:
      break;
    case commands.os:
      break;
    case commands.hash:
      break;
    case commands.compress:
    case commands.decompress:
      break;
    default:
      return 'Such command is not exist\n'  
  }

  return 'Hi\n'
}

const init = () => {
  const transformStream = new Transform({
    transform(chunk, encoding, result) {
        try {
          result(null, parseCommand(chunk));
        } catch (err) {
          result(err);
        }
      }
})

  pipeline(
    process.stdin,
    transformStream,
    process.stdout,
    (err) => {
      if(err) process.stderr.write(err)
    }
  )
}

init()