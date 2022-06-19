import { IncomingMessage } from "http";
import { CorrectUrl } from "../models/CorrectUrl";
import { HttpCodes, HttpMethods, ResponseMessages } from "../utils/enums";
import { resultMessage } from "../utils/resultMessage";
import { deleteMethod } from "./deleteMethod";
import { getMethod } from "./getMethod";
import { postMethod } from "./postMethod";
import { putMethod } from "./putMethod";

const controllersSwitcher = async (req: IncomingMessage, reqUrl: CorrectUrl) => {
  const { method } = req
  const { id } = reqUrl
  let response

  switch(method) {
    case HttpMethods.GET:
      return getMethod(id);
    case HttpMethods.POST:
      response = await postMethod(req)
      return response;
    case HttpMethods.PUT:
      response = await putMethod(req, id)
      return response
    case HttpMethods.DELETE:
      response = await deleteMethod(id)
      return response
      default:
        return resultMessage(HttpCodes.INVALID, ResponseMessages.NOT_SUPPORTED)
  }
}

export {
  controllersSwitcher
}