const UserAuth = require("./user.auth");
const bcrypt = require("bcrypt");
function login(req, res) {
  const { Password, Email } = req.body;
  UserAuth.find({ Email })
    .then((data) => {
      const User = bcrypt.compareSync(Password, data.Password);
      if (User) {
        req.session.user = data;
        req.session.authenticated = true;
        res.status(200).json({ data });
      } else {
        res.status(400).json({ error: "Password incorrect" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
function signUp(req, res) {
  const { Password } = req.body;
  Password = bcrypt.hashSync(bcrypt.genSaltSync(10), Password);
  UserAuth.create({ ...body, Password })
    .then((x) => {
      req.session.user = x;
      req.session.authenticated = true;
      res.status(200).json(x);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}
module.exports = { login, signUp };
