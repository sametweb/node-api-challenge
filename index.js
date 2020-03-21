const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const actionRouter = require("./data/helpers/actionRouter");
const projectRouter = require("./data/helpers/projectRouter");

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger);

const PORT = process.env.PORT;

server.get("/", (req, res) => {
  res.status(200).send("<h1>Hello World!</h1>");
});

server.use("/actions", actionRouter);
server.use("/projects", projectRouter);

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString().replace("T", " ")}] ${
      req.method
    } method is requested on "${req.url}" path`
  );
  next();
}

server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
