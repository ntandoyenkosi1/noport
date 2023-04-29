const fs = require("fs");
function generatePageRoutes(models, directory) {
  let obj = models.map((model) => {
    model = model.split(".")[0];
    let modelUpperCase = model.replace(model[0], model[0].toUpperCase());
    let content = `const ${modelUpperCase}=require("../models/${model}")
router.get("/${model}s", function (req, res) {
${modelUpperCase}.find()
    .lean()
    .then(function (data) {
      res.render("${model}s/index", { data });
    });
});
router.get("/${model}s/create", function (req, res) {
  res.render("${model}s/create");
});
router.get("/${model}s/edit/:id", function (req, res) {
  ${modelUpperCase}.findById(req.params.id)
    .lean()
    .then(function (data) {
      res.render("${model}s/edit", { ...data });
    })
    .catch(function (err) {
      res.redirect("/");
    });
});
router.get("/${model}s/delete/:id", function (req, res) {
  ${modelUpperCase}.findById(req.params.id)
    .lean()
    .then(function (data) {
      res.render("${model}s/delete", { ...data });
    })
    .catch(function (err) {
      res.redirect("/");
    });
});
router.get("/${model}s/details/:id", function (req, res) {
  ${modelUpperCase}.findById(req.params.id)
    .lean()
    .then(function (data) {
      res.render("${model}s/details", { ...data });
    })
    .catch(function (err) {
      res.redirect("/");
    });
});
`;
    return content;
  }).join(`
  `);
  fs.writeFileSync(
    directory + "\\controllers\\index.js",
    `const router=require("express").Router();
${obj}
module.exports=router`
  );
}
module.exports = { generatePageRoutes };
