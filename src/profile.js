document.addEventListener("DOMContentLoaded", function () {
  handleUserPage();
});

function handleUserPage() {
  document.getElementById("profileFirstName")?.setAttribute("value", localStorage.getItem("firstname") || "First Name");
  document.getElementById("profileLastName")?.setAttribute("value", localStorage.getItem("lastname") || "Last Name");
  document.getElementById("profileUsername")?.setAttribute("value", localStorage.getItem("username") || "Username");
  document.getElementById("profileEmail")?.setAttribute("value", localStorage.getItem("email") || "E-Mail");
}
