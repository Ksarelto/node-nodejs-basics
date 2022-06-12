import { calcHash } from "./calcHash.js"
import { DIRECTORY_MESSAGE } from "../common/constants.js";
import { getErrorMessage } from "../common/utils.js";

export const hashOperations = (arg) => {
  try{
    calcHash(arg);
  } catch (err) {
    getErrorMessage(err)
  }
}