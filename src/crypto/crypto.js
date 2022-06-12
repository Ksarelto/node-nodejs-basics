import { commands } from "../common/enum.js";
import { getErrorMessage } from "../common/utils.js";
import { compress } from "./compress.js";
import { decompress } from "./decompress.js";

export const cryptoOperations = (command, args) => {
  try {
    switch(command) {
      case commands.compress:
        compress(args);
        break;
      case commands.decompress:
        decompress(args);
        break;
    }
  } catch(err) {
    getErrorMessage(err)
  }
}