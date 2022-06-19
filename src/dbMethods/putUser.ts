import fs from 'fs'
import db from '../db/db.json';
import { DataBase, RequestBody } from '../utils/types';

const putUser = async (data: RequestBody, id: string) => new Promise((resolve, reject) => {
    const database = db as DataBase
    const person = database.users.find((el) => el.id === id);

    if(!person) resolve(null);

    database.users = database.users.map((el) => {
        let newUser = {...el}
        if(newUser.id === id){
            newUser = {...data, id: el.id};
        }
        return newUser;
    });

    fs.writeFile('./src/db/db.json', JSON.stringify(database), (err) => {
        if(err) {
           reject(err);
        } else {
            resolve([data]);
        }
    });
})

export {
  putUser
}