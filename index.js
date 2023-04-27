const path = require("path");
var fs = require("fs");
const folder = path.join(__dirname, "models");
const generateController = require("./utils/generateController");
const { generateRoutes } = require("./utils/generateRoutes");
const { generateIndex } = require("./utils/generateIndex");
const { generateLayout } = require("./utils/generateLayout");
const { generateViews } = require("./utils/generateViews");
const data = fs.readdirSync("models").map((fileName) => {
  const model = require(path.join(folder, fileName));
  const keys = Object.keys(model.schema.obj);
  const objs = keys.map((key) => {
    return { file: fileName, key: key, value: model.schema.obj[key] };
  });
  return objs;
});

var allFiles = [];
data.forEach((item, index) => {
  item.forEach((i, key) => {
    if (!allFiles.includes(item[key].file)) {
      allFiles.push(item[key].file);
    }
    //generateController(item[key].file, item);
  });
});
generateViews(allFiles, data);
// generateLayout(allFiles);
// generateIndex(allFiles);
// generateRoutes(allFiles);
