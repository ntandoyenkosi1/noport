const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = require("express").Router();
router.post("/api/users/login", (req, res) => {
  const { Email, Password } = req.body;
  User.findOne({ Email: Email })
    .lean()
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "User not found",
        });
      }
      // console.log(user);
      const isValid = bcrypt.compareSync(Password, user.Password);
      console.log({ isValid });
      if (isValid) {
        req.session.save(() => {
          req.session.user = { ...user, Password: "" };
          req.session.loggedIn = true;
          res.send({ ok: true, data: user });
        });
      } else {
        res.send({ ok: false, data: "Incorrect password" });
      }
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
});
router.post("/api/users/signup", (req, res) => {
  let pw = bcrypt.hashSync(req.body.Password, 10);
  const user = new User({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Password: pw,
  });
  user
    .save()
    .then((data) => {
      req.session.save(() => {
        data.Password = "";
        req.session.user = data;
        req.session.loggedIn = true;
        res.send({ ok: true, data: data });
      });
    })
    .catch((err) => {
      res.status(500).send({ ok: false, error: err });
    });
});
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
router.get("/login", function (req, res) {
  if (req.session.loggedIn == true) {
    return res.redirect("/");
  }
  res.render("auth/login");
});
router.get("/signup", function (req, res) {
  res.render("auth/signup");
});
module.exports = router;
