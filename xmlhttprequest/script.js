"use strict";

let req = new XMLHttpRequest();

req.addEventListener("load", function () {
  const data = JSON.parse(req.responseText);
  document.body.append(document.createTextNode(data.kraut));
});

req.open("GET", "http://krautipsum.com/api/kraut");

req.send();
