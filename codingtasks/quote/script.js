"use strict";

let blockquoteTag = document.querySelector("blockquote");
let quoteTag = document.querySelector("quote");
let authorTag = document.querySelector(".author");

function getQuote() {
  fetch("https://dummy-apis.netlify.app/api/quote")
    .then((response) => response.json())
    .then((data) => {
      quoteTag.innerHTML = "";
      authorTag.innerHTML = "";

      quoteTag.classList.add("quotes");

      quoteTag.append(document.createTextNode(data.quote));
      authorTag.append(document.createTextNode("- " + data.author + " -"));
    })
    .catch((error) => {
      console.error("Error displaying the quote:", error);
    });
}

function render() {
  quoteTag.classList.remove("quotes");
  document.querySelector("button").addEventListener("click", getQuote);
}

render();
