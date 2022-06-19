import request from 'supertest';
import {server} from '../src/server';
import db from '../src/db/db.json';
import { DataBase } from '../src/utils/types';
import { defaultUrl } from '../src/utils/constants';

const firstUser = {
  username: 'Peter',
  age: 24,
  hobbies: ['Run', 'Ride', 'Jump']
}

const secondUser = {
  username: 'Romel',
  age: 14,
  hobbies: ['Jump']
}

const thirdUser = {
  username: 'Bob',
  age: 66,
  hobbies: ['Hide', 'Purr']
}

describe('success scenarios os requests two', () => {
  const database = db as DataBase;

  beforeAll(() => {
    database.users = []
  })

  test('should add new user', async () => {
    const responseOne = await request(server).post(defaultUrl).send(firstUser);
    expect(responseOne.status).toBe(201);

    const responseTwo = await request(server).post(defaultUrl).send(secondUser);
    expect(responseTwo.status).toBe(201);

    const responseThree = await request(server).post(defaultUrl).send(thirdUser);
    expect(responseThree.status).toBe(201);
  })
  test('should get all users', async () => {
    const response = await request(server).get(defaultUrl);
    expect(response.status).toBe(200);

    const users = JSON.parse(response.text);
    expect(users.length).toBe(3);
  })
  test('should get one of the users', async () => {
    const { id } = database.users[1];
    const response = await request(server).get(`${defaultUrl}/${id}`);
    const [user] = JSON.parse(response.text);
    expect(user).toEqual(database.users[1]);
    expect(response.status).toBe(200);
  })
  test('should delete the last user', async () => {
    const { id } = database.users[2];
    const response = await request(server).delete(`${defaultUrl}/${id}`);
    expect(response.status).toBe(204);
  })
  test('should get users without deleted', async () => {
    const response = await request(server).get(defaultUrl);
    const users = JSON.parse(response.text);
    expect(users).toEqual(database.users);
    expect(response.status).toBe(200);
  })
})