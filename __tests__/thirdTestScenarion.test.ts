import request from 'supertest';
import {server} from '../src/server';
import db from '../src/db/db.json';
import { defaultUrl } from '../src/utils/constants';
import { DataBase } from '../src/utils/types';

const newUser = {
  username: 'Romel',
  age: 14,
  hobbies: ['Jump']
}

const firstUser = {
  username: 'Peter',
  age: 24,
  hobbies: ['Run', 'Ride', 'Jump']
}

const secondUser = {
  username: 'Test',
  age: 14,
  hobbies: ['Jump']
}


describe('success scenarios', () => {
  const database = db as DataBase

  beforeAll(() => {
    database.users = [
      {"username":"Peter","age":24,"hobbies":["Run","Ride","Jump"],"id":"b8b842fe-d279-4a15-9a16-f5d25ad3d5ca"},
      {"username":"Cris","age":14,"hobbies":["Run","Jump"],"id":"b8b842fe-d279-4a15-9d16-f5d22ad3d5ca"},
      {"username":"Randy","age":25,"hobbies":["Run","Drink","Jump"],"id":"b8b842fe-d279-4a15-1d16-f5d25ad3d5ca"},
      {"username":"Morse","age":76,"hobbies":["Run",],"id":"b8b842fe-d279-4a15-9d16-f5d25ad3d8ca"}
    ];
  })

  test('responds with json', async () => {
    const response = await request(server).get(defaultUrl);
    expect(JSON.parse(response.text)).toEqual(database.users);
    expect(response.status).toBe(200);
  });

  test('responds with json', async () => {
    const [,,thirdUser] = database.users;
    const { id } = thirdUser;
    const putResponse = await request(server).put(`${defaultUrl}/${id}`).send(newUser);
    expect(putResponse.status).toBe(200);

    const getResponse = await request(server).get(`${defaultUrl}/${id}`);
    expect(getResponse.status).toBe(200);
    expect(JSON.parse(getResponse.text)[0]).not.toEqual(thirdUser);
  });

  test('responds with json', async () => {
    const [userOne, userTwo] = database.users
    const deleteFirstUser = await request(server).delete(`${defaultUrl}/${userOne.id}`);
    expect(deleteFirstUser.status).toBe(204);

    const deleteSecondUser = await request(server).delete(`${defaultUrl}/${userTwo.id}`);
    expect(deleteSecondUser.status).toBe(204);

    const response = await request(server).get(defaultUrl);
    expect(JSON.parse(response.text).length).toBe(2);
    expect(response.status).toBe(200);
  });

  test('responds with json', async () => {
    const responseOne = await request(server).post(defaultUrl).send(firstUser);
    expect(responseOne.status).toBe(201);

    const responseTwo = await request(server).post(defaultUrl).send(secondUser);
    expect(responseTwo.status).toBe(201);
    
    const response = await request(server).get(defaultUrl);
    expect(JSON.parse(response.text).length).toBe(4);
    expect(response.status).toBe(200);
  });
});