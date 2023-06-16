const { generateController } = require("./generateController");
const { generateIndex } = require("./generateIndex");
const { generateJavaScript } = require("./generateJavaScript");
const { generateLayout } = require("./generateLayout");
const { generatePageRoutes } = require("./generatePageRoutes");
const { generateRoutes } = require("./generateRoutes");
const { generateServer } = require("./generateServer");
const { generateViews } = require("./generateViews");

module.exports = {
  generateController,
  generateIndex,
  generateJavaScript,
  generateLayout,
  generatePageRoutes,
  generateRoutes,
  generateServer,
  generateViews,
};
