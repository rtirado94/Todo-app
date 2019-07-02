var express = require("express");
var router = express.Router();
const Task = require("../models/Task");

router.get("/Tasks", function(req, res, next) {
  Task.findAll()
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.get("/Task/:id", function(req, res, next) {
  Task.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(tasks => {
      if (task) {
        res.json(tasks);
      } else {
        res.send("Task does not exist");
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.post("/task", function(req, res, next) {
  if (!req.body.task_name) {
    res.status(400);
    res.json({
      error: "Bad Data"
    });
  } else {
    Task.create(req.body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.json("error: " + err);
      });
  }
});

router.delete("/task/:id", function(req, res, next) {
  Task.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.json({ status: "Task Deleted!" });
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.put("/task/:id", function(req, res, next) {
  if (!req.body.task_name) {
    res.status(400);
    res.json({
      error: "Bad Data"
    });
  } else {
    Task.update(
      { task_name: req.body.task_name },
      { where: { id: req.params.id } }
    )
      .then(() => {
        res.json({ status: "Task Updated!" });
      })
      .error(err => handleError(err));
  }
});

module.exports = router;
