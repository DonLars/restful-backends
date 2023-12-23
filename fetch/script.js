"use strict";

function loadKraut() {
  fetch("http://krautipsum.com/api/kraut")
    .then((response) => response.json())
    .then((data) => {
      document.body.append(document.createTextNode(data.kraut));
    });
}

document.querySelector("button").addEventListener("click", loadKraut);
