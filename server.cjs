const { createServer } = require("node:http");
const next = require("next");

process.env.NODE_ENV ??= "production";

if (!process.env.ADMIN_PASSWORD || !process.env.SESSION_SECRET) {
  throw new Error("Set ADMIN_PASSWORD and SESSION_SECRET in the cPanel environment variables before starting the application.");
}

const port = Number(process.env.PORT || 3000);
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((request, response) => {
    handle(request, response).catch((error) => {
      console.error("Request failed:", error);
      if (!response.headersSent) {
        response.statusCode = 500;
        response.end("Internal Server Error");
      } else {
        response.destroy();
      }
    });
  });

  server.on("error", (error) => {
    console.error("Server failed:", error);
    process.exit(1);
  });

  server.listen(port, () => {
    console.log(`Studio Malsko server listening on port ${server.address().port}`);
  });
}).catch((error) => {
  console.error("Next.js startup failed:", error);
  process.exit(1);
});