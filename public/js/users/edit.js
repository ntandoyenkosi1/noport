document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  let FirstName = document.querySelector(".FirstName").value
  let LastName = document.querySelector(".LastName").value
  let Email = document.querySelector(".Email").value
  let Password = document.querySelector(".Password").value
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({ FirstName, LastName, Email, Password }),
  })
    .then((x) => x.json())
    .then(function (data) {
      document.location.href("/users");
    });
});
    