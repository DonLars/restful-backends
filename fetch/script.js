"use strict";

/* function loadKraut() {
  fetch("http://krautipsum.com/api/kraut")
    .then((response) => response.json())
    .then((data) => {
      document.body.append(document.createTextNode(data.kraut));
    });
}

document.querySelector("button").addEventListener("click", loadKraut);

 */
fetch("https://jsonplaceholder.typicode.com/users", {
  method: "post",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Fetch API - XMLHttpRequest in schön",
    url: "https://jsonplaceholder.typicode.com/users",
  }),
})
  .then(function (response) {
    console.log("RESPONSE: " + response);
  })
  .catch(function (error) {
    console.error("ERROR: " + error);
  });
