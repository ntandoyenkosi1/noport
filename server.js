const express = require("express");
const app = express();
const router = require("./routes/index");
app.use(express.json());
const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/test1";
const mongoose = require("mongoose");
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(router);
// app.get("*", (req, res) => {
//   res.status(200).send("Endpoint not defined");
// });
app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
