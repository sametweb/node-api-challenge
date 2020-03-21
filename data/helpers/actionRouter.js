const express = require("express");

const actionDb = require("../helpers/actionModel");

const server = express();

server.get("/", (req, res) => {
  actionDb.get().then(actions => res.status(200).json(actions));
});

server.post("/", (req, res) => {
  const action = req.body;

  if (!action.project_id) {
    res.status(400).json({ error: "You must select a project" });
  } else if (!action.description) {
    res.status(400).json({ error: "You must enter a description" });
  } else {
    actionDb
      .insert(action)
      .then(added => res.status(201).json(added))
      .catch(error =>
        res
          .status(404)
          .json({ message: "Error adding your action to database.", error })
      );
  }
});

server.put("/:id", (req, res) => {
  const { id } = req.params;
  const action = req.body;

  if (!action.project_id) {
    res.status(400).json({ error: "You must select a project" });
  } else if (!action.description) {
    res.status(400).json({ error: "You must enter a description" });
  } else {
    actionDb.update(id, action).then(updated =>
      updated
        ? res.status(200).json(updated)
        : res.status(404).json({
            message: "The action with the provided id cannot be found."
          })
    );
  }
});

server.delete("/:id", (req, res) => {
  const { id } = req.params;
  actionDb.remove(id).then(deleted =>
    deleted
      ? res.status(204).end()
      : res.status(404).json({
          message: "The action with the provided id cannot be found."
        })
  );
});

module.exports = server;
