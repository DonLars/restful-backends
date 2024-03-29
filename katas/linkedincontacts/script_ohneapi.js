"use strict";

// Cards in State
// Random Background Image

// List select
const ul = document.querySelector("#cardlist");
const pending = document.querySelector(".pending");
const cancel = document.querySelector(".cancel");
const pendingCount = document.querySelector(".pending span");

// Eine Person Datensatz

// Set state
const state = {
  id: null,
  mutualConnections: null,
  pendingUsers: 0,
  people: [],
};

co;

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

/*function loadCardsFromAPI(numOfCards) {
  fetch(
    `https://dummy-apis.netlify.app/api/contact-suggestions?count=${numOfCards}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Received data from API:", data);
      // data??????? => array
      state.people = data;
      render();
    })
    .catch((error) => {
      console.error("Error fetching or displaying the users:", error);
    });
}*/

function render() {
  const data = state.people;

  if (data && data.length > 0) {
    for (const user of data) {
      const card = generateCardTemplate(user);
      ul.appendChild(card);
    }
    getPendingFromStorage();
  } else {
    console.error("Invalid or empty results in API response.");
  }
}

// EVENTLISTENER - connect button
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

// EVENTLISTENER - cancel button
cancel.addEventListener("click", (event) => {
  // delete complete storage
  localStorage.removeItem("pendingUsers");
  getPendingFromStorage();
});

// EVENTLISTENER - close button
ul.addEventListener("click", (event) => {
  const closeBtn = event.target.closest(".close");
  if (closeBtn) {
    const closeLi = closeBtn.closest(".card");
    // delete active
    if (closeLi) {
      closeLi.remove();
      // add one card
      loadCardsFromAPI(1);
    }
  }
});

function init() {
  ul.innerHTML = "";
  //loadCardsFromAPI(8);
  getPendingFromStorage();
}

init();
