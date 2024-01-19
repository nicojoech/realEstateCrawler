import API_URL from "./config.js";

document.addEventListener("DOMContentLoaded", function () {
  var searchForm = document.getElementById("searchForm");

  if (searchForm) {
    // Add event listeners to postalCode and state fields
    var postalCodeField = document.getElementById("postalCode");
    var stateField = document.getElementById("state");

    postalCodeField.addEventListener("input", function () {
      // If postalCode is not empty, disable the state dropdown
      stateField.disabled = !!this.value.trim();
      stateField.classList.toggle("border-gray-300", stateField.disabled);
      stateField.classList.toggle("border-primary", !stateField.disabled);
    });

    stateField.addEventListener("change", function () {
      // If state is selected, clear postalCode and disable the input
      postalCodeField.value = "";
      postalCodeField.disabled = !!this.value.trim();
      postalCodeField.classList.toggle(
        "border-gray-300",
        postalCodeField.disabled
      );
      postalCodeField.classList.toggle(
        "border-primary",
        !postalCodeField.disabled
      );
    });

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

      // Validate the form input
      if (
        !validateAgentForm(
          agentName,
          minArea,
          maxPrice,
          numRooms,
          postalCode,
          state
        )
      ) {
        return;
      }

      var agentData = {
        name: agentName,
        min_area: minArea,
        max_price: maxPrice,
        number_of_rooms: Number(numRooms),
        zip_code: postalCode,
        state: state,
        user_id: localStorage.getItem("userId"),
      };

      console.log(agentData);

      // Erster Fetch-Aufruf
      fetch(`${API_URL}/users/${agentData.user_id}/count`, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok: ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);

          if (data < 3) {
            return fetch(`${API_URL}/agents/`, {
              method: "POST",
              body: JSON.stringify(agentData),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((secondResponse) => {
                if (!secondResponse.ok) {
                  throw new Error(
                    `Network response was not ok: ${secondResponse.statusText}`
                  );
                }
                return secondResponse.json();
              })
              .then(() => {
                window.location.href = "/src/profile.html";
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          } else {
            alert("You cannot create more than 3 search agents!");
            return;
          }
        });
    });

    // Add event listener for the "Reset Form" button
    var resetButton = document.getElementById("resetButton");

    if (resetButton) {
      resetButton.addEventListener("click", function () {
        // Reset the form when the "Reset Form" button is clicked
        searchForm.reset();

        // Reset the visual styles for postalCode and state
        stateField.disabled = false;
        stateField.classList.remove("border-gray-300");
        stateField.classList.add("border-primary");

        postalCodeField.value = "";
        postalCodeField.disabled = false;
        postalCodeField.classList.remove("border-gray-300");
        postalCodeField.classList.add("border-primary");
      });
    }
  }
});

function validateAgentForm(
  agentName,
  minArea,
  maxPrice,
  numRooms,
  postalCode,
  state
) {
  if (!agentName) {
    alert("Please fill out all required fields marked with *.");
    return false;
  }

  if (minArea || maxPrice || numRooms || postalCode || state) {
  } else {
    alert("Please fill out at least one of the search parameters.");
    return false;
  }

  if (agentName.length > 50) {
    alert("Agent name is too long. Please enter a shorter name.");
    return false;
  }

  if (
    isNaN(minArea) ||
    isNaN(maxPrice) ||
    isNaN(numRooms) ||
    isNaN(postalCode)
  ) {
    alert(
      "Minimum area, maximum price, number of rooms and postal code must be numeric values."
    );
    return false;
  }

  if (minArea < 0 || maxPrice < 0 || numRooms < 0 || postalCode < 0) {
    alert(
      "Values for minimum area, maximum price, number of rooms and postal code must be non-negative."
    );
    return false;
  }

  if (postalCode) {
    const postalCodePattern = /^\d{4}$/;
    if (!postalCodePattern.test(postalCode)) {
      alert(
        "Invalid postal code format. Please enter a valid 4-digit postal code."
      );
      return false;
    }

    if (postalCode.startsWith("0")) {
      alert("Postal code cannot start with 0.");
      return false;
    }
  }

  return true;
}
