const path = require("path");
var fs = require("fs");
const folder = path.join(__dirname, "models");
const generateController = require("./utils/generateController");

const data = fs.readdirSync("models").map((fileName) => {
  const model = require(path.join(folder, fileName));
  const keys = Object.keys(model.schema.obj);
  const objs = keys.map((key) => {
    return { file: fileName, key: key, value: model.schema.obj[key] };
  });
  return objs;
});

function generateViews() {}
var map = new Map();
console.log(
  data[0].map((item) => {
    var key = item.key;
    var value = `req.body.${item.key}`;
    console.log(key, value, "KVP");

    map.set(key, value);
    return { name: item.key };
  })
);

data.forEach((item, index) => {
  generateController(item[index].file, item);
});