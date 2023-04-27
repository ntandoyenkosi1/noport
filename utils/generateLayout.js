const fs = require("fs");
function generateLayout(models) {
  models = models
    .map((x) => x.split(".")[0].replace(/./, x[0].toUpperCase()))
    .map((y) => {
      return `<a href="${y.toLowerCase()}s">${y}s</a>`;
    });
  const content = `<html>
    <head>
      <title>NoPort</title>

      <link rel="stylesheet" href="/css/style.css" />
    </head>

    <body>
      <header>
        <h1>NoPort</h1>
        <ul>
          ${models.join(`
          `)}
        </ul>
      </header>
      {{{body}}}

    </body>

  </html>`;
  fs.writeFileSync("views/layouts/main.handlebars", content);
}
module.exports = {
  generateLayout,
};
