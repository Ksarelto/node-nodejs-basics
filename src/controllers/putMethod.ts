import { IncomingMessage } from "http";
import { HttpCodes, ResponseMessages } from "../utils/enums";
import { getRequestBody } from "../utils/getRequestBody";
import { isValidId } from "../utils/isValidId";
import { resultMessage } from "../utils/resultMessage";
import { validateRequestBody } from "../utils/validateRequestBody";
import { RequestBody } from "../utils/types";
import { putUser } from '../dbMethods/putUser'

const putMethod = async (req: IncomingMessage, id: string | undefined) => {
  try {
    if (!id || !isValidId(id)) {
      return resultMessage(HttpCodes.INVALID, ResponseMessages.INVALID_ID)
    }
  
    const requestBody = await getRequestBody(req)
  
    if(!validateRequestBody(requestBody as RequestBody)) {
      return resultMessage(HttpCodes.INVALID, ResponseMessages.INVALID_BODY)
    }
  
    const response = await putUser(requestBody as RequestBody, id);
  
    if(!response) {
      return resultMessage(HttpCodes.NOT_FOUND, ResponseMessages.NOT_EXIST_USER)
    }
  
    return resultMessage(HttpCodes.SUCCESS, response)
  } catch (err) {
    return resultMessage(HttpCodes.INTERNAL_ERROR, (err as Error).message)
  }
}

export {
  putMethod
}