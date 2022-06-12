import fs from 'fs'
import { commands } from '../common/enum.js'
import { INVALID_ARGS } from '../common/constants.js';
import { add } from './add.js';
import { cat } from './cat.js';
import { copy } from './copy.js';
import { move } from './move.js';
import { remove } from './remove.js'
import { rename } from './rename.js';
import { getErrorMessage } from '../common/utils.js';

export const fileSystemOperations = (command, args) => {
  try {
    if (args.length > 2) throw new Error(INVALID_ARGS)

    switch(command) {
      case commands.cat:
        cat(args);
        break;
      case commands.add:
        add(args);
        break; 
      case commands.rm:
        remove(args);
        break; 
      case commands.mv:
        move(args);
        break;
      case commands.cp:
        copy(args);
        break; 
      case commands.rn:
        rename(args);
        break;
    }
  } catch(err) {
   getErrorMessage(err)
  }
}