import { IncomingMessage } from "http"
import { v4 as uuidv4 } from 'uuid';
import { HttpCodes, ResponseMessages } from "../utils/enums";
import { getRequestBody } from "../utils/getRequestBody"
import { resultMessage } from "../utils/resultMessage";
import { validateRequestBody } from "../utils/validateRequestBody";
import { RequestBody } from "../utils/types";
import { postUser } from '../dbMethods/postUser'

const postMethod = async (req: IncomingMessage) => {
  try {
    const requestBody = await getRequestBody(req);
    if(!validateRequestBody(requestBody as RequestBody)) {
      return resultMessage(HttpCodes.INVALID, ResponseMessages.INVALID_BODY)
    }

    const id = uuidv4()
    const response = await postUser({...requestBody as RequestBody, id})

    return resultMessage(HttpCodes.CREATED, response)
 } catch (err) {
    return resultMessage(HttpCodes.INTERNAL_ERROR, (err as Error).message)
 }

}

export {
  postMethod
}