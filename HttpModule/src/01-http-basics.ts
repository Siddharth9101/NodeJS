import http, { type IncomingMessage, type ServerResponse } from "node:http";

/**
 * .createServer() - creates low level http server
 * the callback passed to it is going to run for every request
 *
 * req contains:
 * req.method - get, post, etc
 * req.url - /users, etc
 * req.headers - metadata of req
 * req.body - actual data sent by client
 *
 * res contains:
 * res.status code
 * res.headers
 * res.body
 */

const PORT = 3000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method;
    const url = req.url;
    const userAgent = req.headers["user-agent"];

    res.statusCode = 200;

    res.setHeader("Content-Type", "text/plain");
    res.end(`method: ${method}, url: ${url}, userAgent: ${userAgent}`);
  },
);

server.listen(PORT, () => console.log("server started"));
