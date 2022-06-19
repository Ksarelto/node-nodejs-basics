import fs from 'fs'
import db from '../db/db.json';
import { DataBase, ResponseBody } from '../utils/types';

const postUser = async (data: ResponseBody) => new Promise((resolve, reject) => {
    const database = db as DataBase;
    database.users.push(data);

    fs.writeFile('./src/db/db.json', JSON.stringify(database), (err) => {
        if(err) {
            reject(err);
        } else {
            resolve([data]);
        }
    });
   })

export {
  postUser
}