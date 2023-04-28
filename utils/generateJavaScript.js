const fs = require("fs");
function generateCreateJS(model, keys) {
  let k = keys
    .map((x) => {
      return x.key;
    })
    .join(", ");
  const content = `document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  ${keys.map((x) => {
    return `let ${x.key} = document.querySelector(".${x.key}").value`;
  }).join(`
  `)}
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  fetch("/api/${model}s", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ ${k} }),
  })
    .then((x) => x.json())
    .then(function (data) {
      location.redirect("/${model}s");
    });
});`;
  fs.writeFileSync("views/test/create.js", content);
}
function generateDeleteJS(model, keys) {
  const content = `document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  let id = document.querySelector("input[type=hidden]").value;
  fetch(\`/api/${model}s/\${id}\`, {
    method: "DELETE",
  })
    .then((x) => x.json())
    .then(function (data) {
      location.redirect("/${model}s");
    });
});`;
  fs.writeFileSync("views/test/delete.js", content);
}
function generateEditJS(model, keys) {
  let k = keys
    .map((x) => {
      return x.key;
    })
    .join(", ");
  const content = `document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  ${keys.map((x) => {
    return `let ${x.key} = document.querySelector(".${x.key}").value`;
  }).join(`
  `)}
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  fetch(\`/api/${model}s/\${id}\`, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({ ${k} }),
  })
    .then((x) => x.json())
    .then(function (data) {
      document.location.href("/${model}s");
    });
});
    `;
  fs.writeFileSync("views/test/edit.js", content);
}

function generateJavaScript(models, data) {
  data.forEach((x) => {
    generateCreateJS(x[0].file?.split(".")[0], x);
    generateEditJS(x[0].file?.split(".")[0], x);
    generateDeleteJS(x[0].file?.split(".")[0], x);
  });
}
module.exports = { generateJavaScript };
