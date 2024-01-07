import API_URL from "./config.js";

document.addEventListener("DOMContentLoaded", function () {
  fetchUserProfile();
});

const fetchUserProfile = async () => {
  try {
    const response = await fetch(`${API_URL}/currentUser`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });

    if (response.ok) {
      const data = await response.json();

      const firstname = data.first_name;
      const lastname = data.last_name;
      const email = data.email;
      const username = data.username;
      const userId = data.id;

      if (userId) {
        fetchAgents(userId);
      }

      if (!firstname || !lastname || !email || !username) {
        console.error("Invalid response from server");
        alert("Failed to fetch user profile. Please try again.");
        return;
      }

      document
        .getElementById("profileFirstName")
        ?.setAttribute("value", firstname);
      document
        .getElementById("profileLastName")
        ?.setAttribute("value", lastname);
      document.getElementById("profileEmail")?.setAttribute("value", email);
      document
        .getElementById("profileUsername")
        ?.setAttribute("value", username);
    } else {
      console.error("Server error:", response.statusText);
      alert("Failed to fetch user profile. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An unexpected error occurred. Please try again.");
  }
};

const fetchAgents = async (id) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}/agents`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();

      var divContainer = document.createElement("div");
      divContainer.className = "mb-6";

      var h5Title = document.createElement("h5");
      h5Title.className =
        "mb-2 text-2xl font-bold tracking-tight text-gray-900";
      h5Title.textContent = "Search Agents";

      data.forEach(function (agent) {
        var innerDiv = document.createElement("div");
        innerDiv.className =
          "max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mb-4";

        var cardTitle = document.createElement("h5");
        cardTitle.className =
          "mb-2 text-2xl font-bold tracking-tight text-gray-900";
        cardTitle.textContent = agent.name;

        var paramsList = document.createElement("ul");
        paramsList.className = "mb-3 list-disc font-normal text-gray-700 pl-4";

        var minAreaItem = document.createElement("li");
        minAreaItem.textContent = "Min Area: " + agent.min_area;
        paramsList.appendChild(minAreaItem);

        var maxPriceItem = document.createElement("li");
        maxPriceItem.textContent = "Max Price: " + agent.max_price;
        paramsList.appendChild(maxPriceItem);

        var numberOfRoomsItem = document.createElement("li");
        numberOfRoomsItem.textContent = "Rooms: " + agent.number_of_rooms;
        paramsList.appendChild(numberOfRoomsItem);

        var zipItem = document.createElement("li");
        zipItem.textContent = "Zip Code: " + agent.zip_code;
        paramsList.appendChild(zipItem);

        var stateItem = document.createElement("li");
        stateItem.textContent = "State: " + agent.state;
        paramsList.appendChild(stateItem);

        var deleteButton = document.createElement("button");
        deleteButton.type = "submit";
        deleteButton.className =
          "btn text-primary border-primary border-2 hover:bg-primary hover:text-white t-ease mr-2";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
          let agentId = agent.id;
          deleteCrawlerById(agentId);
          window.location.href = "profile.html";
        });

        var editButton = document.createElement("button");
        editButton.type = "submit";
        editButton.className =
          "btn text-primary border-primary border-2 hover:bg-primary hover:text-white t-ease";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
          let agentId = agent.id;
          localStorage.setItem("agentId", agentId);
          window.location.href = "updateAgent.html";
        });

        var startButton = document.createElement("button");
        startButton.type = "submit";
        startButton.className =
          "btn text-primary border-primary border-2 hover:bg-primary hover:text-white t-ease float-right";
        startButton.textContent = "Start";
        startButton.id = agent.id;
        startButton.addEventListener("click", function () {
          let id = startButton.id;
          startCrawlerById(id);
          startButton.style.display = "none";
          stopButton.style.display = "block";
        });

        var stopButton = document.createElement("button");
        stopButton.type = "submit";
        stopButton.className =
          "btn text-primary border-primary border-2 hover:bg-primary hover:text-white t-ease float-right";
        stopButton.textContent = "Stop";
        stopButton.id = agent.id;
        stopButton.addEventListener("click", function () {
          let id = stopButton.id;
          stopCrawlerById(id);
          startButton.style.display = "block";
          stopButton.style.display = "none";
        });

        if (agent.inUse) {
          startButton.style.display = "none";
          stopButton.style.display = "block";
        } else {
          startButton.style.display = "block";
          stopButton.style.display = "none";
        }

        innerDiv.appendChild(cardTitle);
        innerDiv.appendChild(paramsList);
        innerDiv.appendChild(deleteButton);
        innerDiv.appendChild(editButton);
        innerDiv.appendChild(startButton);
        innerDiv.appendChild(stopButton);

        divContainer.appendChild(innerDiv);
      });

      var targetDiv = document.getElementById("searchagentcard");
      targetDiv.appendChild(divContainer);
    } else {
      console.error("Server error:", response.statusText);
      alert("Failed to fetch user profile. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An unexpected error occurred. Please try again.");
  }
};

const startCrawlerById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/agents/start/${id}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

const stopCrawlerById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/agents/stop/${id}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

const deleteCrawlerById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/agents/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};
