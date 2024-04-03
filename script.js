// DOM elements
const time = document.getElementById("time");
const form = document.getElementById("form");
const tableBody = document.getElementById("tbody");
const alertMessage = document.getElementById("alert");
const msg = document.getElementById("message");
const ok = document.getElementById("ok");
const addTabForm = document.getElementById("addTabletForm");
var loader=document.getElementById("loader");

// Global variables
let remainders = [];
let audio;

// Fetch initial remainders data
fetch("https://medicine-remainder-backend.onrender.com/remainders")
  .then((res) => res.json())
  .then((data) => {
    loader.style.display="none";
    remainders = data;
    displayRemainders();
  })
  .catch((err) => console.log(err));

// Display current time
function displayTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  time.textContent = `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
setInterval(displayTime, 1000);

// Event listener for adding remainder
form.addEventListener("submit", addRemainder);
function addRemainder(event) {
  event.preventDefault();
  const name = event.target[0].value;
  const time = event.target[1].value;
  const remainder = { id: remainders.length + 1, name, time };

  if (name !== "Select your Tablet" && time) {
    remainders.push(remainder);
    event.target[0].value = "Select your Tablet";
    event.target[1].value = "";

    // Send POST request to add remainder
    fetch("https://medicine-remainder-backend.onrender.com/remainders", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(remainder),
    })
    .catch((err) => console.log(err)); // Handle fetch error
  }
  displayRemainders();
}

// Event listener for deleting remainder
tableBody.addEventListener("click", deleteRemainder);
function deleteRemainder(event) {
  if (event.target.classList.contains("delete")) {
    const row = event.target.parentNode.parentNode;
    const index = row.rowIndex - 1;
    const deletedRemainder = remainders[index];

    // Send DELETE request to remove remainder
    fetch(`https://medicine-remainder-backend.onrender.com/remainders/${deletedRemainder.id}`, {
      method: "DELETE",
    })
    .catch((err) => console.log(err)); // Handle fetch error

    remainders.splice(index, 1);
    displayRemainders();
  }
}

// Check remainders for alerts
function checkRemainders() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const time2 = `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

  const matchedRemainders = remainders.filter((value) => value.time === time2);
  matchedRemainders.forEach((val) => {
    msg.textContent = `Time to Take ${val.name}!`;
    alertMessage.style.display = "block";

    audio = new Audio("ring.wav");
    audio.loop = true;
    audio.play();

    console.log("Alert: Time to Take " + val.name);
  });
}

// Event listener for acknowledging alert
ok.addEventListener("click", () => {
  const reminderIndex = remainders.findIndex((reminder) => reminder.time === alertMessage.getAttribute("data-time"));

  if (reminderIndex !== -1) {
    remainders.splice(reminderIndex, 1);
    displayRemainders();
  }

  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  alertMessage.style.display = "none";
});

// Check remainders periodically
setInterval(checkRemainders, 60000);

// Function to display remainders in the table
function displayRemainders() {
  tableBody.innerHTML = "";
  remainders.forEach((remainder) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.textContent = remainder.name;
    const td2 = document.createElement("td");
    td2.textContent = remainder.time;
    const td3 = document.createElement("td");
    const del = document.createElement("button");
    del.setAttribute("class", "delete btn btn-danger");
    del.textContent = "Delete";
    td3.appendChild(del);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tableBody.appendChild(tr);
  });
}
