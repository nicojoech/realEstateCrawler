import API_URL from "./config.js";

document.addEventListener("DOMContentLoaded", function () {
  var searchForm = document.getElementById("searchForm");

  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const loggedIn = localStorage.getItem("accessToken");
      if (!loggedIn) {
        alert("Log in to create a crawler agent!");
        return;
      }

      var agentName = document.getElementById("agentName").value;
      var minArea = document.getElementById("minArea").value;
      var maxPrice = document.getElementById("maxPrice").value;
      var numRooms = document.getElementById("numRooms").value;
      var postalCode = document.getElementById("postalCode").value;
      var state = document.getElementById("state").value;

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
