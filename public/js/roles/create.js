document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  let Name = document.querySelector(".Name").value
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  fetch("/api/roles", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ Name }),
  })
    .then((x) => x.json())
    .then(function (data) {
      window.location.replace("/roles");
    });
});