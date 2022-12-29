const fs = require("fs");
/**
 *
 * @param {String[]} fileName
 * @param {{file: string; key: string; value: any;}[]} data
 * @returns
 */
function generateRoutes(fileName) {
  var f = fileName.map((file) => {
    return file.split(".")[0];
  });
  var files = f.map((file) => {
    return `const ${file} = require("../controllers/${file}-controller");
`;
  });
  var content = f.map((file) => {
    var modelName = file.replace(file.charAt(0), file.charAt(0).toUpperCase());
    return `
router.get("/${file}s", ${file}.findAll${modelName}s);
router.get("/${file}s/:${file}Id", user.find${modelName}ById);
router.post("/${file}s", ${file}.create${modelName});
router.put("/${file}s/:${file}Id", ${file}.update${modelName});
router.delete("/${file}s/:${file}Id", ${file}.delete${modelName});`;
  });

  fs.writeFileSync(
    `all-routes.js`,
    `const express = require("express");
${files.join("")}
const router=express()
${content.join("")}
module.exports = router;`
  );
}
module.exports = { generateRoutes };
generateRoutes(["product.js", "user.js"]);
