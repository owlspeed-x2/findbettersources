const targets = [
  { name: "Izvestia", url: "https://www.iz.ru", req: 0 },
  { name: "Komsomolskaya Pravda", url: "https://kp.ru", req: 0 },
  { name: "Lenta", url: "https://lenta.ru", req: 0 },
  { name: "Rossiyskaya Gazeta", url: "https://rg.ru", req: 0 },
  { name: "Russia Today", url: "https://www.rt.com", req: 0 },
  { name: "Sputnik", url: "https://sputniknews.com", req: 0 },
  { name: "TASS", url: "https://tass.com", req: 0 },
  { name: "Vesti", url: "https://vesti.ru", req: 0 },
];

var table = document.getElementById("site-table");
var startButton = document.getElementById("start-button");
var stopButton = document.getElementById("stop-button");

var requestInterval, uiInterval;

startButton.addEventListener("click", () => toggleIntervals());
stopButton.addEventListener("click", () => toggleIntervals());

setTable();

function toggleIntervals() {

  // Start / Stop requests
  requestInterval = !requestInterval
    ? setInterval(() => randomRequest(), 10)
    : clearInterval(requestInterval);
  uiInterval = !uiInterval
    ? setInterval(() => setTable(), 1000)
    : clearInterval(uiInterval);

  // Change button text to reflect status
  startButton.innerText = requestInterval ? "Running..." : "Start"
}

function randomRequest() {
  const randomTarget = targets[Math.floor(Math.random() * targets.length)];
  fetch(randomTarget.url);
  randomTarget.req += 1;
}

function setTable() {
  const oldRows = document.getElementsByClassName("row");
  while (oldRows.length > 0) {
    oldRows[0].parentNode.removeChild(oldRows[0]);
  }

  targets.forEach((target, i) => {
    const row = document.createElement("tr");

    const name = document.createElement("td");
    name.classList.add("row");
    name.innerText = target.url;

    const req = document.createElement("td");
    req.classList.add("row");
    req.innerText = target.req;

    row.appendChild(name);
    row.appendChild(req);
    table.appendChild(row);
  });
}
