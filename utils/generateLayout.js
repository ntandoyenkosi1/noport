const fs = require("fs");
function generateLayout(models) {
  models = models
    .map((x) => x.split(".")[0].replace(/./, x[0].toUpperCase()))
    .map((y) => {
      return `<a href="/${y.toLowerCase()}s">${y}s</a>`;
    });
  const content = `<html>
    <head>
      <title>NoPort</title>

      <link rel="stylesheet" href="/css/style.css" />
    </head>

    <body>
      <header>
        <h1><a href="/">NoPort</a></h1>
        {{#if loggedIn}}
          <span>Logged in</span>
        {{/if}}
        <ul>
          ${models.join(`
          `)}
        {{#if loggedIn}}
          <a href="/logout">Logout</a>
        
        {{else}}
          <a href="/login">Login</a>
          <a href="/signup">Register</a>
          {{/if}}
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
