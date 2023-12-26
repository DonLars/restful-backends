"use strict";

const main = document.getElementById("main");
const rgb = document.getElementById("rgb");

let redInput = document.getElementById("red");
let greenInput = document.getElementById("green");
let blueInput = document.getElementById("blue");

const button = document.querySelector("button"); // for random fetch

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

const picked = document.querySelector(".mixer-range");

if (picked) {
  updateBackgroundColor();
}
main.style.backgroundColor = "hotpink";

// New Fetch Api

function getColor() {
  fetch("https://dummy-apis.netlify.app/api/color")
    .then((response) => response.json())
    .then((data) => {
      console.log(
        "red: " +
          data.rgb.r +
          ", green: " +
          data.rgb.g +
          ", blue: " +
          data.rgb.r
      );
      redInput = data.rgb.r;
      greenInput = data.rgb.g;
      blueInput = data.rgb.b;
      const backgroundColor = `rgb(${redInput},${greenInput},${blueInput})`;
      main.style.backgroundColor = backgroundColor;
      rgb.textContent = backgroundColor;
    })
    .catch((error) => {
      console.error("Error displaying the color:", error);
    });
}

function render() {
  button.addEventListener("click", getColor);
}

render();
