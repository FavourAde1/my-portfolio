import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

import serverEntry from "../dist/server/server.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const clientRoot = join(root, "dist", "client");
const port = Number(process.env.PORT || 10000);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

async function serveAsset(request, response) {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const filePath = normalize(join(clientRoot, pathname));

  if (!filePath.startsWith(clientRoot) || filePath === clientRoot) return false;

  try {
    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) return false;
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath)] || "application/octet-stream",
    });
    createReadStream(filePath).pipe(response);
    return true;
  } catch {
    return false;
  }
}

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405).end("Method Not Allowed");
    return;
  }

  if (await serveAsset(request, response)) return;

  const origin = `http://${request.headers.host || `localhost:${port}`}`;
  const url = new URL(request.url || "/", origin);
  const webResponse = await serverEntry.fetch(new Request(url, { method: request.method }));

  response.writeHead(webResponse.status, Object.fromEntries(webResponse.headers));
  if (request.method === "HEAD" || !webResponse.body) {
    response.end();
    return;
  }

  const body = webResponse.body.getReader();
  const pump = async () => {
    const { done, value } = await body.read();
    if (done) {
      response.end();
      return;
    }
    response.write(value);
    await pump();
  };
  await pump();
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Portfolio server listening on port ${port}`);
});
