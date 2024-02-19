var time = document.getElementById("time");
var form = document.getElementById("form");
var medicineName = document.getElementById("name");
var remainderTime = document.getElementById("remainder");
var tableBody = document.getElementById("tbody");

var users = [];
let remainders = [];

function displayTime() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  time.innerHTML = hours + ":" + minutes + ":" + seconds;
  console.log((time.innerHTML = hours + ":" + minutes + ":" + seconds));
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
  if (name && time) {
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
  if (event.target[2]) {
    remainders[i]="";
  }
}

function checkRemainders() {
  var time2 = hours + ":" + minutes;
  remainders.forEach((val) => {
    if (val.time === time2) {
      alert("Time to Take Message");
    }
  });
}
setInterval(checkRemainders, 60000);
