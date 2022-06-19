# Simple CRUD Operations API

It is an application, that create a server that get requsts and return responses for simple CRUD operations: get, post, put, delete.

## How to install

1. Open your IDE and run in terminal "git clone https://github.com/Ksarelto/node-nodejs-basics.git"
2. Run in terminal command "git checkout crud-api"
3. In command line run command "npm install" to install all dependencies.
4. Create .env file in downloaded folder and add variable "PORT=8000"
5. The application is ready to run

## How to run application

There are some modes of work.

1. If you want to run application in development mode you need to entre in command line "npm run start:dev".
2. If you want to run application in production mode you need to entre in command line "npm run start:prod".
3. If you want to run application with cluster you need to entre in command line "npm run start:multi".
4. Application is ready for work.

## How to work with server

1. You need to use some application for testing API like "Postman".
2. In "Postman" you should send requsts to "localhost:8000" and you will get responses.

-- **Template for creating or changing user**

```
{
  "username": "SomeName",
  "age": 12,
  "hobbies": [
    "Walking",
    "Skiing"
  ]
}
```

| Requests            | Responses                               |
| ------------------- | --------------------------------------- |
| GET                 |                                         |
| **/api/users**      | Return all users                        |
| **/api/users/{id}** | Return user by id                       |
| POST                |                                         |
| **/api/users**      | Create new user by using **template**   |
| PUT                 |                                         |
| **/api/users/{id}** | Change user by id with new **template** |
| DELETE              |                                         |
| **/api/users/{id}** | Delete user by id                       |

## How to run tests

1. If you want to test the application you should to run in the terminal command: 'npm run test'.
