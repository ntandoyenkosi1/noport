document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  let Name = document.querySelector(".Name").value
  let StartDate = document.querySelector(".StartDate").value
  let EndDate = document.querySelector(".EndDate").value
  let Status = document.querySelector(".Status").value
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  fetch("/api/courses", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ Name, StartDate, EndDate, Status }),
  })
    .then((x) => x.json())
    .then(function (data) {
      window.location.replace("/courses");
    });
});