const User = require("../models/user");

const findAllUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.send({ ok: true, data: users });
    })
    .catch((err) => {
      res.status(500).send({ ok: false, error: err });
    });
};

const findUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send({ ok: true, data: user });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          ok: false,
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        ok: false,
        message: "Error retrieving user with id " + req.params.userId,
      });
    });
};

const createUser = (req, res) => {
  const user = new User({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Password: req.body.Password,
  });
  user
    .save()
    .then((data) => {
      res.send({ ok: true, data: data });
    })
    .catch((err) => {
      res.status(500).send({ ok: false, error: err });
    });
};

const updateUser = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ ok: false, message: "User content can not be empty" });
  }
  const body = req.body;
  User.findByIdAndUpdate(
    req.params.userId,
    {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Password: req.body.Password,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send({ ok: true, data: user });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          ok: false,
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        ok: false,
        message: "Error updating user with id " + req.params.userId,
      });
    });
};

const deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send({ ok: true, message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          ok: false,
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        ok: false,
        message: "Could not delete user with id " + req.params.userId,
      });
    });
};
module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
};
