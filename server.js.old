const express = require("express");
const next = require("next");
const cors = require("cors");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(cors());

  server.get("/iuxta/api", cors(), function(req, res, next) {
    res.json({ msg: "This is CORS-enabled for a Single Route" });
    return app.render(req, res, "/iuxta/api", req.query);
  });

  server.get("/a", (req, res) => {
    return app.render(req, res, "/b", req.query);
  });

  server.get("/b", (req, res) => {
    return app.render(req, res, "/a", req.query);
  });

  server.get("/posts/:id", (req, res) => {
    return app.render(req, res, "/posts", { id: req.params.id });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
