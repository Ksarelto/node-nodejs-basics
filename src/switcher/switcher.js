import { commands } from '../common/enum.js';
import { osOperations } from '../os/osOperations.js';
import { pathOperations } from '../path/path.js';
import { cryptoOperations } from '../crypto/crypto.js';
import { fileSystemOperations } from '../fs/fs.js'
import { INVALID_INPUT } from '../common/constants.js';
import { commandsParcer } from '../common/utils.js';
import { hashOperations } from '../hash/hashOperation.js';

export const parseCommand = (command) => {
  const systemCall = commandsParcer(command);
  const [systemCommand, ...args] = systemCall;
  
  switch(systemCommand){
    case commands.exit:
      process.exit(0);
    case commands.cd:
    case commands.ls:
    case commands.up:
      pathOperations(systemCommand, args);
      break;
    case commands.cat:
    case commands.add:
    case commands.rn:
    case commands.cp:
    case commands.rm:
    case commands.mv:
      fileSystemOperations(systemCommand, args)
      break;
    case commands.compress:
    case commands.decompress:
      cryptoOperations(systemCommand, args)
      break;
    case commands.os:
      osOperations(args)
      break;
    case commands.hash:
      hashOperations(args)
      break;
    default:
        console.log(INVALID_INPUT)
  }
}