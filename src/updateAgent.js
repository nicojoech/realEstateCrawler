import API_URL from "./config.js";

document.addEventListener("DOMContentLoaded", function () {
  const agentId = localStorage.getItem("agentId");
  //console.log(document.getElementById("updateState").value);
  if (agentId) {
    fetchAgentData(agentId);
  } else {
    alert("No agent selected");
  }

  const updateForm = document.getElementById("updateForm");

  if (updateForm) {
    // Add event listeners to postalCode and state fields
    var postalCodeField = document.getElementById("updatePostalCode");
    var stateField = document.getElementById("updateState");

    postalCodeField.addEventListener("input", function () {
      // If postalCode is not empty, disable the state dropdown
      stateField.disabled = !!this.value.trim();
      stateField.value = "";
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

    updateForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const loggedIn = localStorage.getItem("accessToken");
      if (!loggedIn) {
        alert("Log in to update a crawler agent!");
        return;
      }

      var agentName = document.getElementById("updateAgentName").value;
      var minArea = document.getElementById("updateMinArea").value;
      var maxPrice = document.getElementById("updateMaxPrice").value;
      var numRooms = document.getElementById("updateNumRooms").value;
      var postalCode = document.getElementById("updatePostalCode").value;
      var state = document.getElementById("updateState").value;

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

      fetch(`${API_URL}/agents/${agentId}`, {
        method: "PUT",
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

    var updateResetButton = document.getElementById("updateResetButton");

    if (updateResetButton) {
      updateResetButton.addEventListener("click", function () {
        updateForm.reset();

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

const fetchAgentData = async (agentId) => {
  try {
    const response = await fetch(`${API_URL}/agents/${agentId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const name = data.name;
      const minArea = data.min_area;
      const maxPrice = data.max_price;
      const numOfRooms = data.number_of_rooms;
      const zipCode = data.zip_code;
      const state = data.state;

      document.getElementById("updateAgentName")?.setAttribute("value", name);
      document.getElementById("updateMinArea")?.setAttribute("value", minArea);
      document
        .getElementById("updateMaxPrice")
        ?.setAttribute("value", maxPrice);
      document
        .getElementById("updateNumRooms")
        ?.setAttribute("value", numOfRooms);
      document
        .getElementById("updatePostalCode")
        ?.setAttribute("value", zipCode);
      var updateStateSelect = document.getElementById("updateState");

      for (var i = 0; i < updateStateSelect.options.length; i++) {
        if (updateStateSelect.options[i].value === state) {
          updateStateSelect.options[i].selected = true;
          break;
        }
      }
    } else {
      console.error("Server error:", response.statusText);
      alert("Failed to fetch user profile. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An unexpected error occurred. Please try again.");
  }
};

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
