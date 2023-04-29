const Course=require("../models/course")
  router.get("/courses", function (req, res) {
  Course.find()
    .lean()
    .then(function (data) {
      res.render("courses/index", { data });
    });
});
router.get("/courses/create", function (req, res) {
  res.render("courses/create");
});
router.get("/courses/edit/:id", function (req, res) {
  Course.findById(req.params.id)
    .lean()
    .then(function (data) {
      res.render("courses/edit", { ...data });
    })
    .catch(function (err) {
      res.redirect("/");
    });
});
router.get("/courses/delete/:id", function (req, res) {
  Course.findById(req.params.id)
    .lean()
    .then(function (data) {
      res.render("courses/delete", { ...data });
    })
    .catch(function (err) {
      res.redirect("/");
    });
});
router.get("/courses/details/:id", function (req, res) {
  Course.findById(req.params.id)
    .lean()
    .then(function (data) {
      res.render("courses/details", { ...data });
    })
    .catch(function (err) {
      res.redirect("/");
    });
});

  const Role=require("../models/role")
  router.get("/roles", function (req, res) {
  Role.find()
    .lean()
    .then(function (data) {
      res.render("roles/index", { data });
    });
});
router.get("/roles/create", function (req, res) {
  res.render("roles/create");
});
router.get("/roles/edit/:id", function (req, res) {
  Role.findById(req.params.id)
    .lean()
    .then(function (data) {
      res.render("roles/edit", { ...data });
    })
    .catch(function (err) {
      res.redirect("/");
    });
});
router.get("/roles/delete/:id", function (req, res) {
  Role.findById(req.params.id)
    .lean()
    .then(function (data) {
      res.render("roles/delete", { ...data });
    })
    .catch(function (err) {
      res.redirect("/");
    });
});
router.get("/roles/details/:id", function (req, res) {
  Role.findById(req.params.id)
    .lean()
    .then(function (data) {
      res.render("roles/details", { ...data });
    })
    .catch(function (err) {
      res.redirect("/");
    });
});

  const User=require("../models/user")
  router.get("/users", function (req, res) {
  User.find()
    .lean()
    .then(function (data) {
      res.render("users/index", { data });
    });
});
router.get("/users/create", function (req, res) {
  res.render("users/create");
});
router.get("/users/edit/:id", function (req, res) {
  User.findById(req.params.id)
    .lean()
    .then(function (data) {
      res.render("users/edit", { ...data });
    })
    .catch(function (err) {
      res.redirect("/");
    });
});
router.get("/users/delete/:id", function (req, res) {
  User.findById(req.params.id)
    .lean()
    .then(function (data) {
      res.render("users/delete", { ...data });
    })
    .catch(function (err) {
      res.redirect("/");
    });
});
router.get("/users/details/:id", function (req, res) {
  User.findById(req.params.id)
    .lean()
    .then(function (data) {
      res.render("users/details", { ...data });
    })
    .catch(function (err) {
      res.redirect("/");
    });
});
