document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  let Email = document.querySelector(".Email").value;
  let Password = document.querySelector(".Password").value;
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  fetch("/api/users/login", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ Email, Password }),
  })
    .then((x) => x.json())
    .then(function (data) {
      console.log(data);
      window.location.replace("/users");
    })
    .catch(function (err) {
      alert("An error occured");
      console.log(err);
      //window.location.replace("/")
    });
});
