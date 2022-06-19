import { RequestBody } from "./types";

const validateRequestBody = (body: RequestBody | string) => {
  if(typeof body === 'string') return false
  if(typeof body.username !== 'string') return false;
  if(typeof body.age !== 'number') return false;
  if(!Array.isArray(body.hobbies)) return false;

  const isStrings = body.hobbies.every((el) => typeof el === 'string');
  if(!isStrings) return false;

  return true;
}

export { validateRequestBody}