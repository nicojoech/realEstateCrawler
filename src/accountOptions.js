const accessToken = localStorage.getItem("accessToken");
const username = localStorage.getItem("username");
const navigationDiv = document.getElementById("accountOptions");

if (!accessToken) {
  document.addEventListener("DOMContentLoaded", function () {
    renderLoginButtons(navigationDiv);
  });
} else {
  document.addEventListener("DOMContentLoaded", function () {
    renderLogoutButtons(navigationDiv, username);
  });
}

function renderLoginButtons(parentElement) {
  const loginButton = createButton("Log in", "login.html");
  parentElement.appendChild(loginButton);

  const signUpButton = createButton("Sign up", "register.html");
  parentElement.appendChild(signUpButton);
}

function renderLogoutButtons(parentElement, username) {
  const logoutButton = createButton("Logout", "#", handleLogout);
  parentElement.appendChild(logoutButton);

  const userButton = createButton(username || "User", "#", handleUserPage);
  parentElement.appendChild(userButton);
}

function createButton(text, href, clickHandler) {
  const button = document.createElement("a");
  button.href = href;
  button.classList.add(
    "btn",
    "text-primary",
    "ml-2",
    "border-primary",
    "border-2",
    "hover:bg-primary",
    "hover:text-white",
    "t-ease"
  );
  button.textContent = text;

  if (clickHandler) {
    button.addEventListener("click", clickHandler);
  }

  return button;
}

function handleLogout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("username");
  window.location.href = "login.html";
  consolge.log("test");
}

function handleUserPage() {
  console.log("Navigate to user page");
}
