import http, { type IncomingMessage, type ServerResponse } from "node:http";

const PORT = 3000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method;

    const requestUrl = new URL(req.url ?? "/", `http://${req.headers.host}`);
    const pathName = requestUrl.pathname;

    res.setHeader("Content-Type", "text/plain");

    if (method === "GET" && pathName === "/health") {
      res.statusCode = 200;
      res.end("server is healthy");
      return;
    }
    if (method === "GET" && pathName === "/users") {
      res.statusCode = 200;
      res.end("all users list");
      return;
    }

    if (method === "POST" && pathName === "/users") {
      res.statusCode = 201;
      res.end("user created");
      return;
    }

    res.statusCode = 404;
    res.end("route not found");
  },
);

server.listen(PORT, () => console.log("server started"));
