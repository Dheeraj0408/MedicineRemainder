var time = document.getElementById("time");
var form = document.getElementById("form");
var medicineName = document.getElementById("name");
var remainderTime = document.getElementById("remainder");
var tableBody = document.getElementById("tbody");
var alertMessage = document.getElementById("alert");
var msg = document.getElementById("message");
var ok = document.getElementById("ok");
var error1 = document.getElementById("selectError");
var error2 = document.getElementById("timeError");
var audio;
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
  let name = event.target[0].value;
  let time = event.target[1].value;
  let remainder = {
    name: name,
    time: time,
  };
  if (name && time && validateInputs(name, time)) {
    remainders.push(remainder);
    event.target[0].value = "";
    event.target[1].value = "";
  }

  displayRemainders();
}

function validateInputs(input1, input2) {
  let isValid = true;
  if (input1 === "Select your Tablet") {
    error1.textContent = "Please select a tablet.";
    error1.style.display = "block";
    error1.style.color = "#e34244";
    tabletSelect.style.borderColor = "#e34244";
    isValid = false;
  } else {
    error1.textContent = "";
    tabletSelect.style.borderColor = "#ccc";
  }

  if (input2 === "--:--") {
    error2.textContent = "Please enter a valid remainder time.";
    error2.style.display = "block";
    error2.style.color = "#e34244";
    remainderTime.style.borderColor = "#e34244";
    isValid = false;
  } else {
    error2.textContent = "";
    remainderTime.style.borderColor = "#ccc";
  }
  return isValid;
}

function displayRemainders() {
  tableBody.innerHTML = "";
  remainders.forEach((val, ind) => {
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.innerHTML = val.name;
    var td2 = document.createElement("td");
    td2.innerHTML = val.time;
    var td3 = document.createElement("td");
    var del = document.createElement("button");
    del.setAttribute("class", "delete");
    del.innerHTML = "Delete";
    del.addEventListener("click", () => {
      remainders.splice(ind, 1);
      tr.remove();
    });
    td3.appendChild(del);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tableBody.appendChild(tr);
  });

  console.log(remainders);
}

function checkRemainders() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var time2 =
    (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;
  remainders.forEach((val) => {
    if (time2 === val.time) {
      msg.innerHTML = "Time  to Take " + val.name + "!</s> ";
      alertMessage.style.display = "block";

      audio = new Audio("ring.wav");
      audio.loop = true;
      audio.play();
      console.log("Alert: Time to Take " + val.name);
    }
  });
}

ok.addEventListener("click", () => {
  var reminderIndex = remainders.findIndex(
    (reminder) => reminder.time === alertMessage.getAttribute("data-time")
  );

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

setInterval(checkRemainders, 60000);
