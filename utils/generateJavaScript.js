const fs = require("fs");
const path = require("path");
function generateDirectory(models, directory) {
  models.forEach((model) => {
    if (
      !fs.existsSync(directory + "\\public\\js\\" + model.split(".")[0] + "s")
    ) {
      fs.mkdirSync(directory + "\\public\\js\\" + model.split(".")[0] + "s");
    }
  });
}
function generateCreateJS(model, keys, directory) {
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
  fs.writeFileSync(
    directory + "\\public\\js\\" + model + "s\\create.js",
    content
  );
}
function generateDeleteJS(model, keys, directory) {
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
  fs.writeFileSync(
    directory + "\\public\\js\\" + model + "s\\delete.js",
    content
  );
}
function generateEditJS(model, keys, directory) {
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
  fs.writeFileSync(
    directory + "\\public\\js\\" + model + "s\\edit.js",
    content
  );
}

function generateJavaScript(models, data, directory) {
  generateDirectory(models, directory);
  data.forEach((x) => {
    generateCreateJS(x[0].file?.split(".")[0], x, directory);
    generateEditJS(x[0].file?.split(".")[0], x, directory);
    generateDeleteJS(x[0].file?.split(".")[0], x, directory);
  });
}
module.exports = { generateJavaScript };
