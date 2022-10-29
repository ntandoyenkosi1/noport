const fs = require("fs");
/**
 *
 * @param {String} fileName
 * @param {{file: string; key: string; value: any;}[]} data
 * @returns
 */
function generateRoutes(fileName) {
  var model = fileName.split(".js")[0];
  var modelName = model.replace(model.charAt(0), model.charAt(0).toUpperCase());
  fs.writeFileSync(
    `${model}-routes.js`,
    `const express = require("express");
const ${model} = require("../controllers/${model}-controller");
const router=express()
// Users routes
router.get("/${model}s", ${model}.findAll${modelName}s);
router.get("/${model}s/:${model}Id", user.find${modelName}ById);
router.post("/${model}s", ${model}.create${modelName});
router.put("/${model}s/:${model}Id", ${model}.update${modelName});
router.delete("/${model}s/:${model}Id", ${model}.delete${modelName});
module.exports = router;`
  );
}
module.exports={generateRoutes}