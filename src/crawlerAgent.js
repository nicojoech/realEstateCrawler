import API_URL from "./config.js";

document.addEventListener("DOMContentLoaded", function () {
  var searchForm = document.getElementById("searchForm");

  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const loggedIn = localStorage.getItem("accessToken");

      var agentName = document.getElementById("agentName").value;
      var minArea = document.getElementById("minArea").value;
      var maxPrice = document.getElementById("maxPrice").value;
      var numRooms = document.getElementById("numRooms").value;
      var postalCode = document.getElementById("postalCode").value;
      var state = document.getElementById("state").value;

      // Validate the form input
      if (!validateAgentForm(agentName, minArea, maxPrice, numRooms, postalCode, state)) {
        return;
      }

      var agentData = {
        name: agentName,
        min_area: minArea,
        max_price: maxPrice,
        number_of_rooms: numRooms,
        zip_code: postalCode,
        state: state,
        user_id: localStorage.getItem("userId"),
      };

      console.log(agentData);

      // Beispiel: Sende die Daten an das Backend mit fetch
      fetch(`${API_URL}/agents/`, {
        method: "POST",
        body: JSON.stringify(agentData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(() => {
          window.location.href = "/src/profile.html";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }
});

function validateAgentForm(agentName, minArea, maxPrice, numRooms, postalCode, state) {
  if (!agentName) {
    alert("Please fill out all required fields marked with *.");
    return false;
  }

  if (agentName.length > 50) {
    alert("Agent name is too long. Please enter a shorter name.");
    return false;
  }

  if (isNaN(minArea) || isNaN(maxPrice) || isNaN(numRooms) || isNaN(postalCode)) {
    alert("Minimum area, maximum price, number of rooms and postal code must be numeric values.");
    return false;
  }

  if (minArea < 0 || maxPrice < 0 || numRooms < 0 || postalCode < 0) {
    alert("Values for minimum area, maximum price, number of rooms and postal code must be non-negative.");
    return false;
  }

  if (postalCode) {
    const postalCodePattern = /^\d{4}$/;
    if (!postalCodePattern.test(postalCode)) {
      alert("Invalid postal code format. Please enter a valid 4-digit postal code.");
      return false;
    }
  }

  return true;
}
