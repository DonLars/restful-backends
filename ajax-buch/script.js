"use strict";

const request = new XMLHttpRequest();

request.open("GET", "content/data.xml");
request.setRequestHeader("Accept", "text/html");

if (request.readyState === 4 && request.status === 200) {
  var data = request.responseXML;
}
request.addEventListener("loadstart", (event) => {
  console.log("Anfrage gestartet");
});

request.addEventListener("progress", (event) => {
  console.log("Fortschritt");
});

request.addEventListener("abort", (event) => {
  console.log("Anfrage abgebrochen");
});

request.addEventListener("error", (event) => {
  console.log("Fehler bei der Anfrage");
});

request.addEventListener("load", (event) => {
  console.log("Anwort geladen");
});

request.addEventListener("timeout", (event) => {
  console.log("Anfrage wegen Time-out abgebrochen");
});

request.addEventListener("loadend", (event) => {
  console.log("Anfrage beendet");
});

request.send();
