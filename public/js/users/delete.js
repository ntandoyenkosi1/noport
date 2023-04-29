document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  let id = document.querySelector("input[type=hidden]").value;
  fetch(`/api/users/${id}`, {
    method: "DELETE",
  })
    .then((x) => x.json())
    .then(function (data) {
      window.location.replace("/users");
    });
});