/*
<ul class="cardlist">
        <li class="card">
          <div
            class="bg"
            style="
              background: url('https://source.unsplash.com/random/300×300');
            "
          ></div>
          <button class="close">X</button>
          <img
            class="picture"
            src="https://randomuser.me/api/portraits/women/79.jpg"
            alt="Mrs Danica Ferber"
          />
          <h3>
            <span class="name-title">Mrs</span>
            <span class="name-first">Danica</span>
            <span class="name-last">Ferber</span>
          </h3>
          <p class="title">Senior Developer</p>
          <div class="connections"><span>5</span>mutual connections</div>
          <button type="button" class="connect">Connect</button>
        </li>
</ul>

  {
    "name": {
      "title": "Mr",
      "first": "Valentín",
      "last": "Fernández"
    },
    "title": "Test Engineer",
    "picture": "https://randomuser.me/api/portraits/men/89.jpg",
    "mutualConnections": 2,
    "backgroundImage": ""
  },
*/

"use strict";

// Vars

const ul = document.querySelector("#cardlist");
const li = document.createElement("li");
const bg = document.createElement("div");
const img = document.createElement("img");
const h3 = document.createElement("h3");
const salutation = document.querySelector(".salutation");
const firstname = document.querySelector(".firstname");
const lastname = document.querySelector(".lastname");
const title = document.querySelector(".title");
const mutualConnections = document.querySelector(".connections");
const connectBtn = document.createElement("button");
const closeBtn = document.createElement("button");

// Set state

const state = {
  id: null,
  mutualConnections: null,
  pendingUsers: null,
  cards: 8,
};

function createCardTemplate() {
  li.classList.add("card");
  bg.classList.add("bg");
  img.classList.add("picture");
  img.setAttribute("src", "https://randomuser.me/api/portraits/women/79.jpg");
  bg.setAttribute(
    "style",
    "background: url('https://source.unsplash.com/random/300×300')"
  );
  let fullname = salutation + firstname + lastname;
  img.setAttribute("alt", fullname);
  salutation.textContent = "Mrs" + " ";
  firstname.textContent = "Monica" + " ";
  lastname.textContent = "Mustermann";
  title.textContent = "Senior";
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
  console.log(ul);
}

function getCardData(url) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((jsonData) => {
      console.log(jsonData.results);
      //state.pokemonData = jsonData.results;
      //state.nextItems = jsonData.next;
      render();
    })
    .catch((error) => {
      alert("Sorry es gab einen Fehler. Versuche es später nochmal");
    });
}

function render() {
  /*for (const pokemonItem of state.pokemonData) {
    const li = document.createElement("li");
    li.innerHTML = `<a href='${pokemonItem.url}'>${pokemonItem.name}</a>`;
    document.querySelector(".list").appendChild(li);
    
  }*/
}
// Close Button
document.querySelector(".close").addEventListener("click", () => {
  // wenn cards weniger als 8, neu auffüllen bis 8
  if (state.cards < 8) {
    //getCardData();
  }
});

function init() {
  ul.innerHTML = "";

  getCardData(
    "https://dummy-apis.netlify.app/api/contact-suggestions?count=" +
      state.cards
  );
}

init();
createCardTemplate();
