"use strict";

fetch("https://krautipsum.com/api/sentence")
  .then((response) => response.json())
  .then((data) => console.log(data));
