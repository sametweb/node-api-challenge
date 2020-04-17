const express = require("express");
const projectDb = require("./projectModel");
const server = express();

server.get("/", (req, res) => {
  projectDb.get().then(projects => res.status(200).json(projects));
});

server.get("/:id/actions", (req, res) => {
  const { id } = req.params;
  projectDb
    .getProjectActions(id)
    .then(actions => res.status(200).json(actions));
});

server.post("/", (req, res) => {
  const project = req.body;
  if (!project.name || !project.description) {
    res.status(400).json({
      error: "You must enter a name and a description for your project."
    });
  } else {
    projectDb
      .insert(project)
      .then(added => res.status(201).json(added))
      .catch(error =>
        res
          .status(404)
          .json({ message: "Error adding your project to database.", error })
      );
  }
});

server.put("/:id", (req, res) => {
  const { id } = req.params;
  const project = req.body;

  if (!project.name || !project.description) {
    res.status(400).json({
      error: "You must enter a name and a description for your project."
    });
  } else {
    projectDb.update(id, project).then(updated =>
      updated
        ? res.status(200).json(updated)
        : res.status(404).json({
            message: "The project with the provided id cannot be found."
          })
    );
  }
});

server.delete("/:id", (req, res) => {
  const { id } = req.params;
  projectDb.remove(id).then(deleted =>
    deleted
      ? res.status(204).end()
      : res.status(404).json({
          message: "The project with the provided id cannot be found."
        })
  );
});

module.exports = server;
