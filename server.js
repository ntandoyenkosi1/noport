const express = require("express");
const app = express();
const router = require("./routes/index");
const hbsRoutes = require("./controllers");
const path = require("path");
//var hbs = require("hbs");
// hbs.create({})
const { engine } = require("express-handlebars");
app.use(express.json());
const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/test1";
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.engine("handlebars", engine());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(hbsRoutes);
app.use(router);
app.get("/", function (req, res) {
  res.render("create");
});
app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
