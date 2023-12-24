document.addEventListener("DOMContentLoaded", function () {
  handleUserPage();
  createSearchAgentCard();
});

function handleUserPage() {
  document.getElementById("profileFirstName")?.setAttribute("value", localStorage.getItem("firstname") || "First Name"); // TODO
  document.getElementById("profileLastName")?.setAttribute("value", localStorage.getItem("lastname") || "Last Name"); // TODO
  document.getElementById("profileUsername")?.setAttribute("value", localStorage.getItem("username") || "Username");
  document.getElementById("profileEmail")?.setAttribute("value", localStorage.getItem("email") || "E-Mail"); // TODO
}

function createSearchAgentCard() {
  // Create elements
  var divContainer = document.createElement("div");
  divContainer.className = "mb-6";

  var h5Title = document.createElement("h5");
  h5Title.className = "mb-2 text-2xl font-bold tracking-tight text-gray-900";
  h5Title.textContent = "Search Agents";

  var innerDiv = document.createElement("div");
  innerDiv.className = "max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow";

  var cardTitle = document.createElement("h5");
  cardTitle.className = "mb-2 text-2xl font-bold tracking-tight text-gray-900";
  cardTitle.textContent = "Search Agent Name"; // TODO

  var cardParams = document.createElement("p");
  cardParams.className = "mb-3 font-normal text-gray-700";
  cardParams.textContent = "Parameters of search agent"; // TODO

  var deleteButton = document.createElement("button");
  deleteButton.type = "submit";
  deleteButton.className = "btn text-primary border-primary border-2 hover:bg-primary hover:text-white t-ease";
  deleteButton.textContent = "Delete Account";

  // Construct the hierarchy
  innerDiv.appendChild(cardTitle);
  innerDiv.appendChild(cardParams);
  innerDiv.appendChild(deleteButton);
  divContainer.appendChild(h5Title);
  divContainer.appendChild(innerDiv);

  // Append to the specified div
  var targetDiv = document.getElementById("searchagentcard");
  targetDiv.appendChild(divContainer);
}
