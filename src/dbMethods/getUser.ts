import db from '../db/db.json';
import { DataBase } from '../utils/types';

const getUser = (id: string) => {
  const user = (db as DataBase).users.filter((u) => u.id === id)

  if(!user.length) return null
  
  return user
}

const getUsers = () => db.users

export {
  getUser,
  getUsers
}