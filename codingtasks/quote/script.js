"use strict";

let quoteTag = document.querySelector("quote");
let authorTag = document.querySelector("label");

function getQuote() {
  fetch("https://dummy-apis.netlify.app/api/quote")
    .then((response) => response.json())
    .then((data) => {
      quoteTag.innerHTML = "";
      authorTag.innerHTML = "";
      quoteTag.append(document.createTextNode("„" + data.quote + "“"));
      authorTag.append(document.createTextNode("- " + data.author + " -"));
    });
}

function render() {
  document.querySelector("button").addEventListener("click", getQuote);
}

render();
