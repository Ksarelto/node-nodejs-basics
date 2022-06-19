import { getUser, getUsers } from '../dbMethods/getUser';
import { HttpCodes, ResponseMessages } from '../utils/enums';
import { isValidId } from '../utils/isValidId';
import { resultMessage } from '../utils/resultMessage';

const getMethod = (id: string | undefined) => {
  try {
    if (id && !isValidId(id)) {
      return resultMessage(HttpCodes.INVALID, ResponseMessages.INVALID_ID)
    }
  
    if (!id) {
      const users = getUsers()
      return resultMessage(HttpCodes.SUCCESS, users || [])
    }
  
    const user = getUser(id)
  
    if(!user) {
      return resultMessage(HttpCodes.NOT_FOUND, ResponseMessages.NOT_EXIST_USER)
    }
    
    return resultMessage(HttpCodes.SUCCESS ,user)
  } catch (err) {
    return resultMessage(HttpCodes.INTERNAL_ERROR, (err as Error).message)
  }
}

export {
  getMethod
}