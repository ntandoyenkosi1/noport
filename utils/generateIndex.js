const fs = require("fs");
/**
 *
 * @param {Array} fileNames
 * @param {{file: string; key: string; value: any;}[]} data
 * @returns
 */
function generateIndex(fileNames) {
  var f = fileNames.map((file) => {
    return file.split(".")[0];
  });
  const imports = f.map((file) => {
    return `const ${file}Routes = require("./${file}")`;
  });
  const routes = f.map((file) => {
    return `app.use("/${file}s", ${file}Routes)`;
  });
  const indexFile = `const express=require("express")
const router=require("./routes")
const app=express()
app.use("/api",router)
module.exports=router`;
  fs.writeFileSync("routes/index.js", indexFile);
}
//generateIndex(["user.js", "product.js"]);
module.exports = { generateIndex };
