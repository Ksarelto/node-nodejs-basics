import dotenv from 'dotenv'
import cluster from 'cluster'
import { cpus } from 'os'
import { server } from './server'

dotenv.config();

const {PORT} = process.env

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  cpus().forEach(() => {
    cluster.fork();
  })

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else {
  server.listen(PORT, () => console.log(`Worker ${process.pid} observed PORT: ${PORT}`));

  console.log(`Worker ${process.pid} started`);
}