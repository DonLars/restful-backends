"use strict";

const main = document.getElementById("main");
const rgb = document.getElementById("rgb");

const redInput = document.getElementById("red");
const greenInput = document.getElementById("green");
const blueInput = document.getElementById("blue");

const button = document.querySelector("button"); // for fetch

function updateBackgroundColor() {
  const redValue = redInput.value;
  const greenValue = greenInput.value;
  const blueValue = blueInput.value;

  const backgroundColor = `rgb(${redValue},${greenValue},${blueValue})`;
  main.style.backgroundColor = backgroundColor;
  rgb.textContent = backgroundColor;
}
redInput.addEventListener("input", updateBackgroundColor);
greenInput.addEventListener("input", updateBackgroundColor);
blueInput.addEventListener("input", updateBackgroundColor);

main.style.backgroundColor = "hotpink";

const picked = document.querySelector(".mixer-range");

if (picked) {
  updateBackgroundColor();
}

// New Fetch Api

function getColor() {
  fetch("https://dummy-apis.netlify.app/api/color")
    .then((response) => response.json())
    .then((data) => {
      redInput = 200;
      greenValue = 50;
      blueValue = 15;

      //quoteTag.append(document.createTextNode(data.quote));
    })
    .catch((error) => {
      console.error("Error displaying the color:", error);
    });
}

function render() {
  button.addEventListener("click", getColor);
}

render();
