enum UrlParts {
  API = 'api',
  USERS = 'users',
  SLASH = '/'
}

enum HttpMethods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE'
}

enum HttpCodes {
  SUCCESS = 200,
  CREATED = 201,
  DELETED = 204,
  INVALID = 400,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500
}

enum ResponseMessages {
  NOT_SUPPORTED = 'Such method is not supported',
  INVALID_ID = 'Invalid id',
  NOT_EXIST_USER = 'Such user is not exist',
  INVALID_BODY = 'Invalid body',
  NOT_EXIST_EDENDPOINT = 'Such endpoint is not exist',
  SOMETHING_WRONG = 'Something went wrong'
}

export {
  UrlParts,
  HttpMethods,
  HttpCodes,
  ResponseMessages
}