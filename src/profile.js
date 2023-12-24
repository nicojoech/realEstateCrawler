document.addEventListener("DOMContentLoaded", function () {
  handleUserPage();
});

function handleUserPage() {
  document.getElementById("profileUsername")?.setAttribute("value", localStorage.getItem("username") || "Username");
}
