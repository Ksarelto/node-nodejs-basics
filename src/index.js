import { pipeline, Transform } from 'stream';
import { OPERATION_FAILED } from './common/constants.js';
import { parseCommand } from './switcher/switcher.js'


  const transformStream = new Transform({
    transform(chunk, encoding, result) {
        try {
          result(null, parseCommand(chunk));
        } catch (err) {
          result(null, OPERATION_FAILED);
        }
      }
  })


  pipeline(
    process.stdin,
    transformStream,
    process.stdout,
    (err) => {
      if(err) process.stderr.write(err)
    }
  )

