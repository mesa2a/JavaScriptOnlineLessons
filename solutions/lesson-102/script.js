let records = [];

let subjectInput = document.getElementById("subjectInput");
let minutesInput = document.getElementById("minutesInput");
let addButton = document.getElementById("addButton");
let totalMinutes = document.getElementById("totalMinutes");
let recordList = document.getElementById("recordList");

addButton.addEventListener("click", function() {
  let subject = subjectInput.value.trim();
  let minutes = parseInt(minutesInput.value);

  if (subject === "") {
    alert("科目名を入力してください");
    return;
  }

  if (isNaN(minutes) || minutes < 1) {
    alert("学習時間は1分以上にしてください");
    return;
  }

  let record = {
    subject: subject,
    minutes: minutes
  };

  records.push(record);
  showRecords();

  subjectInput.value = "";
  minutesInput.value = "30";
  subjectInput.focus();
});

subjectInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    minutesInput.focus();
  }
});

minutesInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

function showRecords() {
  recordList.replaceChildren();

  let total = 0;
  for (let record of records) {
    total += record.minutes;
  }
  totalMinutes.textContent = total;

  if (records.length === 0) {
    let empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "まだ学習記録がありません";
    recordList.appendChild(empty);
    return;
  }

  for (let i = 0; i < records.length; i++) {
    let record = records[i];

    let item = document.createElement("div");
    item.className = "record-item";

    let number = document.createElement("span");
    number.className = "record-number";
    number.textContent = "#" + (i + 1);

    let subject = document.createElement("span");
    subject.className = "record-subject";
    subject.textContent = record.subject;

    let time = document.createElement("span");
    time.className = "record-time";
    time.textContent = record.minutes + "分";

    item.appendChild(number);
    item.appendChild(subject);
    item.appendChild(time);

    recordList.appendChild(item);
  }
}

showRecords();
subjectInput.focus();
