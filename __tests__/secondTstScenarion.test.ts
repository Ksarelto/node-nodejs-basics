import request from 'supertest';
import {server} from '../src/server';
import db from '../src/db/db.json';
import { defaultUrl } from '../src/utils/constants';
import { ResponseMessages } from '../src/utils/enums';
import { DataBase } from '../src/utils/types';

const newUser = {
  username: 'Peter',
  age: 24,
  hobbies: ['Run', 'Ride', 'Jump']
}

const changedUser = {
  username: 'Andrew',
  age: 33,
  hobbies: []
}

describe('success scenario requests', () => {
  const database = db as DataBase

  beforeAll(() => {
    database.users = [];
  })

  test('should get empty array', async () => {
    const response = await request(server).get(defaultUrl);
    expect(JSON.parse(response.text)).toEqual(database.users);
    expect(response.status).toBe(200);
  });

  test('should create new user', async () => {
    const response = await request(server).post(defaultUrl).send(newUser);
    const [user] = JSON.parse(response.text);
    expect({...user, id: null}).toEqual({...newUser, id: null});
    expect(response.status).toBe(201);
  });

  test('should get created user', async () => {
    const { id } = database.users[0];
    const response = await request(server).get(`${defaultUrl}/${id}`);
    const [user] = JSON.parse(response.text);
    expect(user).toEqual(database.users[0]);
    expect(response.status).toBe(200);
  });

  test('should change created user', async () => {
    const { id } = database.users[0];
    const response = await request(server).put(`${defaultUrl}/${id}`).send(changedUser);
    const [user] = JSON.parse(response.text);
    expect({...user, id: null}).toEqual({...changedUser, id: null});
    expect(response.status).toBe(200);
  });

  test('should check that user is deleted', async () => {
    const { id } = database.users[0];
    const response = await request(server).delete(`${defaultUrl}/${id}`);
    expect(response.status).toBe(204);

    const afterDeleteResponse = await request(server).get(`${defaultUrl}/${id}`);
    expect(JSON.parse(afterDeleteResponse.text)).toBe(ResponseMessages.NOT_EXIST_USER);
    expect(afterDeleteResponse.status).toBe(404);
  });
});