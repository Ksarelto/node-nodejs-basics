import { HttpCodes, ResponseMessages } from "../utils/enums";
import { resultMessage } from "../utils/resultMessage";
import { isValidId } from "../utils/isValidId";
import { deleteUser } from "../dbMethods/deleteUser";

const deleteMethod = async (id: string | undefined) => {
  try {
    if (!id || !isValidId(id)) {
      return resultMessage(HttpCodes.INVALID, ResponseMessages.INVALID_ID)
    }

    const response = await deleteUser(id);
  
    if(!response) {
        return resultMessage(HttpCodes.NOT_FOUND, ResponseMessages.NOT_EXIST_USER)
    }

    return resultMessage(HttpCodes.DELETED, response)
  } catch (err) {
    return resultMessage(HttpCodes.INTERNAL_ERROR, (err as Error).message)
  }
}

export {
  deleteMethod
}