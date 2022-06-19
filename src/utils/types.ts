interface RequestBody {
  username: string,
  age: number,
  hobbies: string[]
}

interface ResponseBody extends RequestBody{
  id: string
}

interface DataBase {
 users: ResponseBody[]
}

export {
  RequestBody,
  ResponseBody,
  DataBase
}