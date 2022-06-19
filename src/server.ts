import { IncomingMessage, ServerResponse, createServer } from "http";
import dotenv from 'dotenv'
import { controllersSwitcher } from "./controllers/controllersSwitcher";
import { isCorrectUrl } from "./utils/checkUrl";
import { headers } from "./utils/constants";
import { HttpCodes, ResponseMessages } from "./utils/enums";
import { resultMessage } from "./utils/resultMessage";

dotenv.config();

const {PORT} = process.env

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const reqUrl = isCorrectUrl(req.url)

    if (reqUrl) {
      const response = await controllersSwitcher(req, reqUrl)
      
      res.writeHead(response.code, { ...headers});
      res.end(JSON.stringify(response.message))
      return
    }

    res.writeHead(HttpCodes.NOT_FOUND, { 'Content-Type': 'text/plain'});
    res.end(JSON.stringify(ResponseMessages.NOT_EXIST_EDENDPOINT));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain'});
    res.end(resultMessage(HttpCodes.INTERNAL_ERROR, (err as Error).message));
  }
})

server.on('error', (e: Error) => {
  if (e.message === 'EADDRINUSE') {
    console.log('Address in use, retrying...');
    setTimeout(() => {
      server.close();
      server.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
    }, 5000);
  } else {
      console.log(`Internal server error code: 500\n Error name: ${e.name}\n  Error message: ${e.message}`);
  }
});


export {
  server
}