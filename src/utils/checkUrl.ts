import { CorrectUrl } from "../models/CorrectUrl";
import { UrlParts } from "./enums";

const isCorrectUrl = (url: string | undefined) => {
  if (!url || url === UrlParts.SLASH) return false

  const urlParts = url.split(UrlParts.SLASH).splice(1);

  if (urlParts.length > 3) return false

  const [api, user, id] = urlParts;

  if (api !== UrlParts.API || user !== UrlParts.USERS) return false;
  
  return new CorrectUrl(user, id)
}

export {
  isCorrectUrl
}