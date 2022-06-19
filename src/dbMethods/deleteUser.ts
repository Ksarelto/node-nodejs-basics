import fs from 'fs'
import db from '../db/db.json';
import { DataBase } from '../utils/types';

const deleteUser = (id: string) => new Promise((resolve, reject) => {
    const database = db as DataBase
    const removedItem = database.users.find((el) => el.id === id);

    if(!removedItem) resolve(null);

    database.users =database.users.filter((el) => el.id !== id);
    fs.writeFile('./src/db/db.json', JSON.stringify(db), (err) => {
        if(err) {
            reject(err);
        } else {
            resolve([removedItem]);
        }
    });
  })

export {
  deleteUser
}