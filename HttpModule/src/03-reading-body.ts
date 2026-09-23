import http, { type IncomingMessage, type ServerResponse } from "node:http";

type UserReqBody = {
  name?: string;
  email?: string;
};

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method;
    const reqUrl = new URL(req.url ?? "/", `http://${req.headers.host}`);
    const pathname = reqUrl.pathname;
    res.setHeader("Content-Type", "text/plain");

    if (method === "POST" && pathname === "/") {
      const chunks: Buffer[] = [];

      req.on("data", (chunk) => {
        chunks.push(chunk);
      });

      req.on("end", () => {
        try {
          const rawData = Buffer.concat(chunks).toString("utf-8");
          if (!rawData) {
            res.statusCode = 400;
            res.end("req body is required");
            return;
          }
          const data = JSON.parse(rawData) as UserReqBody;
          if (!data.name || !data.email) {
            res.statusCode = 422;
            res.end("both name and email are required");
            return;
          }
          res.statusCode = 200;
          res.end(
            `data received successfully, name: ${data.name}, email: ${data.email}`,
          );
        } catch {
          res.statusCode = 400;
          res.end("invalid req body");
          return;
        }
      });

      req.on("error", () => {
        res.statusCode = 500;
        res.end("internal server error");
        return;
      });
      return;
    }

    res.statusCode = 404;
    res.end("route not found");
  },
);

server.listen(3000, () => console.log("server started"));
