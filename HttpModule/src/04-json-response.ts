import http, { type IncomingMessage, type ServerResponse } from "node:http";

type User = {
  id: number;
  name: string;
  email: string;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

const users: User[] = [
  { id: 1, name: "Siddharth", email: "sidd@gmail.com" },
  { id: 2, name: "Basu", email: "basu@gmail.com" },
];

function sendJson<T>(
  res: ServerResponse,
  statusCode: number,
  body: ApiResponse<T>,
): void {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method;
    const reqUrl = new URL(req.url ?? "/", `http://${req.headers.host}`);
    const pathname = reqUrl.pathname;

    if (method === "GET" && pathname === "/") {
      sendJson(res, 200, {
        success: true,
        message: "server is running",
      });
      return;
    }

    if (method === "GET" && pathname === "/users") {
      sendJson(res, 200, {
        success: true,
        message: "users fetched successfully",
        data: users,
      });
      return;
    }

    sendJson(res, 404, {
      message: "route not found",
      success: false,
    });
    return;
  },
);

server.listen(3000, () => console.log("server started"));
