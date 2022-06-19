import { IncomingMessage } from "http";

const getRequestBody = (req: IncomingMessage) => new Promise((resolve) => {
        let data = '';

        req.on('data', (chunk: unknown) => {
            data += chunk;
        });

        req.on('end', (err: unknown) => {
            if(err) resolve((err as Error).message) 
            try{
                resolve(JSON.parse(data));
            } catch(error){
                resolve((error as Error).message)
            }
        })
  })

export {
  getRequestBody
}