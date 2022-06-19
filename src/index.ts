import dotenv from 'dotenv'
import { server } from "./server";

dotenv.config()

const {PORT} = process.env

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
}