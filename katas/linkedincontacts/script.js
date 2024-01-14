"use strict";

// List select
const ul = document.querySelector("#cardlist");
const pending = document.querySelector(".pending");
const pendingCount = document.querySelector(".pending span");

// Set state
const state = {
  id: null,
  mutualConnections: null,
  pendingUsers: 0,
  cards: 8,
};

getPendingFromStorage();
pendingCount.innerHTML = state.pendingUsers;

// Get Pending from storage
function getPendingFromStorage() {
  if (localStorage.getItem("pendingUsers")) {
    state.pendingUsers = JSON.parse(localStorage.getItem("pendingUsers"));
  } else {
    pending.innerHTML = `<span>No</span> pending invitation`;
  }
}

function generateCardTemplate(user) {
  //Create elements
  const li = document.createElement("li");
  const bg = document.createElement("div");
  const img = document.createElement("img");
  const h3 = document.createElement("h3");

  const salutation = document.createElement("span");
  const firstname = document.createElement("span");
  const lastname = document.createElement("span");
  const title = document.createElement("p");
  const mutualConnections = document.createElement("p");

  const connectBtn = document.createElement("button");
  const closeBtn = document.createElement("button");

  li.classList.add("card");
  bg.classList.add("bg");
  img.classList.add("picture");
  img.setAttribute("src", user.picture);
  bg.setAttribute("style", `background: url('${user.backgroundImage}')`);
  img.setAttribute(
    "alt",
    `${user.name.title} ${user.name.first} ${user.name.last}`
  );
  salutation.textContent = `${user.name.title} `;
  firstname.textContent = `${user.name.first} `;
  lastname.textContent = `${user.name.last} `;
  title.textContent = user.title;
  title.classList.add("title");
  if (user.mutualConnections > 0) {
    mutualConnections.innerHTML = `<span>${user.mutualConnections}</span> Mutual Connections`;
    mutualConnections.classList.add("connections");
  }
  connectBtn.type = "button";
  connectBtn.textContent = "Connect";
  connectBtn.classList.add("connect");
  closeBtn.type = "button";
  closeBtn.textContent = "X";
  closeBtn.classList.add("close");

  ul.appendChild(li);
  li.append(closeBtn, bg, img);
  li.appendChild(h3);
  h3.append(salutation, firstname, lastname);
  li.append(title, mutualConnections, connectBtn);

  return li;
}

function loadCardsFromAPI() {
  fetch(
    `https://dummy-apis.netlify.app/api/contact-suggestions?count=${state.cards}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Received data from API:", data);

      if (data && data.length > 0) {
        for (const user of data) {
          const card = generateCardTemplate(user);
          ul.appendChild(card);
        }
        getPendingFromStorage();
      } else {
        console.error("Ungültige oder leere Ergebnisse in der API-Antwort.");
      }
    })
    .catch((error) => {
      console.error("Error fetching or displaying the users:", error);
    });
}

// EVENTLISTENER - connect
ul.addEventListener("click", (event) => {
  const connectBtn = event.target.closest(".connect");
  if (connectBtn) {
    const li = connectBtn.closest(".card");
    const userIndex = Array.from(ul.children).indexOf(li);

    if (connectBtn.textContent === "Connect") {
      state.pendingUsers += 1;
      pending.innerHTML = `<span>${
        state.pendingUsers == 0 ? "no" : state.pendingUsers
      }</span> pending invitation${state.pendingUsers == 1 ? "" : "s"}`;
      connectBtn.textContent = "Pending";
      li.style.opacity = 0.6;
    } else if (connectBtn.textContent === "Pending") {
      state.pendingUsers -= 1;
      pending.innerHTML = `<span>${
        state.pendingUsers == 0 ? "no" : state.pendingUsers
      }</span> pending invitation${state.pendingUsers == 1 ? "" : "s"}`;
      connectBtn.textContent = "Connect";
      li.style.opacity = 1;
    }
    // Save to localstorage
    localStorage.setItem("pendingUsers", JSON.stringify(state.pendingUsers));
  }
});

function init() {
  ul.innerHTML = "";
  loadCardsFromAPI();
  getPendingFromStorage();
}

init();
