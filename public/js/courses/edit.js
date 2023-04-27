document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  let id = document.querySelector("input[type=hidden]").value;
  let Name = document.querySelector(".Name").value;
  let StartDate = document.querySelector(".StartDate").value;
  let EndDate = document.querySelector(".EndDate").value;
  let Status = document.querySelector(".Status").value;
  console.log({ id, Name, EndDate, StartDate, Status });
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  fetch(`/api/courses/${id}`, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({ Name, StartDate, EndDate, Status }),
  })
    .then((x) => x.json())
    .then(function (data) {
      alert("Edit Successfully");

      document.location.href("/courses");
    });
});
