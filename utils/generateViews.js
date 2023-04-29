const fs = require("fs");
function generateDirectory(models, directory) {
  models.forEach((model) => {
    if (!fs.existsSync(directory + "\\views\\" + model.split(".")[0] + "s")) {
      fs.mkdirSync(directory + "\\views\\" + model.split(".")[0] + "s");
    }
  });
}
function generateCreate(model, keys) {
  //console.log(keys.map((y) => y));

  const content = `<h1>Create</h1>
<div>
  <form>
  ${keys.map((x) => {
    return `<div>
    <label for="${x.key}">${x.key}</label>
    <input class="${x.key}" name="${x.key}" ${
      x.value?.required ? "required" : ""
    } type="${
      x.key.toLowerCase().includes("date") ? "date" : "text"
    }" placeholder="${x.key}" />
  </div>`;
  }).join(`
    `)}
    <div>
      <input type="submit" class="btn submit" value="Submit" />
    </div>
  </form>
</div>
<script src="/js/${model}s/create.js"></script>
  `;
  fs.writeFileSync(`views/${model}s/create.handlebars`, content);
}
function generateEdit(model, keys) {
  const content = `<h1>Edit ${model}</h1>
<div>
  <form>
    ${keys
      .map((x) => {
        return `<div>
      <input type="hidden" value="{{_id}}" />
      <label for="${x.key}">${x.key}</label>
      <input class="${x.key}" name="${x.key}" type="${
          x.key.toLowerCase().includes("date") ? "date" : "text"
        }" value="{{${x.key}}}" />
    </div>`;
      })
      .join("")}
    <div>
      <input type="submit" class="btn submit" value="Submit" /></div>
  </form>
</div>
<script src="/js/${model}s/edit.js"></script>
`;
  fs.writeFileSync(`views/${model}s/edit.handlebars`, content);
}
function generateDetails(model, keys) {
  const content = `<h1>Delete</h1>
<div>
  <form>
  <input type="hidden" value="{{_id}}" />
    ${keys
      .map((x) => {
        return `<div>
      
      <label for="${x.key}">${x.key}</label>
      <input class="${x.key}" name="${x.key}" type="${
          x.key.toLowerCase().includes("date") ? "date" : "text"
        }" value="{{${x.key}}}" />
    </div>`;
      })
      .join("")}
  </form>
</div>
<script src="/js/${model}s/edit.js"></script>
  `;
  fs.writeFileSync(`views/${model}s/details.handlebars`, content);
}
function generateDelete(model, keys) {
  const content = `<h1>Delete</h1>
<div>
  <form>
  <input type="hidden" value="{{_id}}" />
    ${keys
      .map((x) => {
        return `<div>
      <label for="${x.key}">${x.key}</label>
      <input class="${x.key}" name="${x.key}" readonly type="${
          x.key.toLowerCase().includes("date") ? "date" : "text"
        }" value="{{${x.key}}}" />
    </div>`;
      })
      .join("")}
      <input type="submit" class="btn submit" value="Delete" />
  </form>
</div>
<script src="/js/${model}s/delete.js"></script>
  `;
  fs.writeFileSync(`views/${model}s/delete.handlebars`, content);
}
function generateIndex(model, keys) {
  const content = `<h1>${model}s</h1>
<a href="/${model}s/create">Create New</a>
<div>
  <table>
    <thead>
      ${keys.map((x) => {
        return `<th>
          ${x.key}
          </th>`;
      })}
    </thead>

    {{#each data}}
      <tr>
      ${keys.map((x) => {
        return `<td>
          {{${x.key}}}
          </td>`;
      })}
        </td>
        <td>
          <a href="/${model}s/details/{{_id}}">View</a>
          <a href="/${model}s/edit/{{_id}}">Edit</a>
          <a href="/${model}s/delete/{{_id}}">Delete</a>
        </td>
      </tr>
    {{/each}}
  </table>
</div>
  `;
  fs.writeFileSync(`views/${model}s/index.handlebars`, content);
}
function generateViews(models, data, directory) {
  //console.log(data);
  generateDirectory(models, directory);
  data.forEach((x) => {
    generateCreate(x[0].file?.split(".")[0], x);
    generateDetails(x[0].file?.split(".")[0], x);
    generateEdit(x[0].file?.split(".")[0], x);
    generateIndex(x[0].file?.split(".")[0], x);
    generateDelete(x[0].file?.split(".")[0], x);
  });
  //models = models.split(".")[0];
  //models.forEach((model) => {});
}
module.exports = { generateViews };
