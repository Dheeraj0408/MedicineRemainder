var time = document.getElementById("time");
var form = document.getElementById("form");
var medicineName = document.getElementById("name");
var remainderTime = document.getElementById("remainder");
var tableBody = document.getElementById("tbody");
var alertMessage = document.getElementById("alert");
var msg = document.getElementById("message");
var ok = document.getElementById("ok");
var audio;
// var users = [];
let remainders = [];
function displayTime() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  time.innerHTML =
    (hours < 10 ? "0" : "") +
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds;
}
setInterval(displayTime, 1000);

form.addEventListener("submit", addRemainder);
function addRemainder(event) {
  event.preventDefault();
  console.log(event);
  let name = event.target[0].value;
  let time = event.target[1].value;
  let remainder = {
    name: name,
    time: time,
  };
  if (name !== "Select your Tablet" && time) {
    remainders.push(remainder);
    event.target[0].value = "";
    event.target[1].value = "";
  }

  displayRemainders();
}
function displayRemainders() {
  tableBody.innerHTML = "";
  for (let i = 0; i < remainders.length; i++) {
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.innerHTML = remainders[i].name;
    var td2 = document.createElement("td");
    td2.innerHTML = remainders[i].time;
    var td3 = document.createElement("td");
    var del = document.createElement("button");
    del.setAttribute("class", "delete");
    del.innerHTML = "Delete";
    td3.appendChild(del);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tableBody.appendChild(tr);
  }
}

tableBody.addEventListener("click", deleteRemainder);

function deleteRemainder(event) {
  if (event.target.classList.contains("delete")) {
    var row = event.target.parentNode.parentNode;
    var index = row.rowIndex - 1; // Adjust index to account for header row
    remainders.splice(index, 1); // Remove the corresponding remainder from the array
    displayRemainders(); // Update the displayed remainders
  }
}

function checkRemainders() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var time2 =
    (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;
  remainders.forEach((val) => {
    if (time2 === val.time) {
      // Display alert notification
      // alert("Time to Take " + val.name);
      msg.innerHTML = "Time  to Take " + val.name + "!</s> ";
      alertMessage.style.display = "block";

      // Play audio
      audio = new Audio("ring.wav"); // Replace 'your-audio-file-path.mp3' with the actual path to your audio file
      audio.loop = true;
      audio.play();
      // Log the alert message in the console
      console.log("Alert: Time to Take " + val.name);
    }
  });
}

ok.addEventListener("click", () => {
  var reminderIndex = remainders.findIndex(
    (reminder) => reminder.time === alertMessage.getAttribute("data-time")
  );

  if (reminderIndex !== -1) {
    // Remove the reminder from the array
    remainders.splice(reminderIndex, 1);
    // Update displayed remainders
    displayRemainders();
  }
  if (audio) {
    audio.pause();
    audio.currentTime = 0; // Reset audio to the beginning
  }
  alertMessage.style.display = "none";
});

setInterval(checkRemainders, 60000); // Check remainders every minute
