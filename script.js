const startBtn = document.querySelector("#startHackBtn");
const stopBtn = document.querySelector("#stopHackBtn");
const resetBtn = document.querySelector("#resetBtn");
const container = document.getElementById("hackingStatus");
const welcomeScreen = document.getElementById("welcomeScreen");
const welcomeHeading = document.getElementById("welcomeHeading");
const welcomePara = document.getElementById("welcomePara");

let target;
let isHacking = false;
let updateArray = [];
let resetAll = false;
let currentValue = "";
let hackingTimerID;
let rainDropInterval;

const createRainDropEffect = (rainDropColor, width, height) => {
  clearInterval(rainDropInterval);
  console.log("from createRainDropEffect, ", rainDropColor);
  const canvas = document.getElementById("binaryRainDrop");
  const context = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  const binary = "01";

  const fontSize = 16;
  const columns = canvas.width / fontSize;

  const rainDrops = [];

  for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
  }

  const draw = () => {
    context.fillStyle = "rgba(0,0,0,0.05)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = rainDropColor;
    context.font = fontSize + "px monospace";

    for (let i = 0; i < rainDrops.length; i++) {
      const text = binary.charAt(Math.floor(Math.random() * binary.length));
      context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

      if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        rainDrops[i] = 0;
      }
      rainDrops[i]++;
    }
  };
  rainDropInterval = setInterval(draw, 25);
};

const getWindowSize = () => {
  width = window.innerWidth;
  height = window.innerHeight;
  createRainDropEffect("#1ce31c", width, height);
};

window.onload = getWindowSize;
window.onresize = getWindowSize;

const hackingUpdates = (target) => {
  updateArray = [
    "Initializing...",
    "Initialized Successfully",
    `Searching for ${target}\'s devices in network...`,
    `Device found!`,
    "Attempting to connect to the device through WiFi...",
    "WiFi Found",
    "Breaching Wifi",
    "Connection Established ",
    "Gaining Access to basic functionalities",
    "Access Gained",
    "Disabling Anitivirus",
    "Anitivirus Disabled",
    `Searching ${target}'s Device for sensitive content`,
    `Scanning Completed`,
    "Finding Vulnerabilities",
    "Vulnerability found in Instagram App",
    "Scanning....",
    `Instagram Username found! username: ${target}`,
    `Breaching Password for ${target}`,
    `Password Cracked! username: ${target}; Password: *********;`,
    "Connecting to Instagram",
    "Connection Established",
    "Instagram account Hacked Successfully",
    "Password Reset Initiated",
    "Password Reset Successfully",
    "Encrypting device data",
    "Encrytion Completed",
    "Transfering Data through FTP",
    "Data Transferred!",
    "Deleting Data from Device",
    "Data Deleted!",
    "Hacking Completed",
    "Disconnected from the device",
  ];
};

const getTarget = (e) => {
  target = e.target.value;
  console.log("Target from getTraget : " + target);
  hackingUpdates(target);
};

const debounce = (func, wait) => {
  let timerID;
  return (e) => {
    clearTimeout(timerID);
    timerID = setTimeout(() => func(e), wait);
  };
};

const debounceCallAPI = debounce(getTarget, 300);

document.querySelector("input").addEventListener("input", debounceCallAPI);

const toggleBtnDisplay = (btnId) => {
  if (btnId === "startHackBtn") {
    startBtn.style.display = "none";
    stopBtn.style.display = "initial";
    stopBtn.classList.add("activeBtn");
  } else if (btnId === "stopHackBtn") {
    stopBtn.classList.add("disabledBtn");
    resetBtn.classList.add("activeBtn");
    resetBtn.classList.remove("disabledBtn");
  } else {
    stopBtn.style.display = "none";
    startBtn.style.display = "initial";
    resetBtn.classList.add("disabledBtn");
    resetBtn.classList.remove("activeBtn");
  }
};

const getStatus = async (index, timer) => {
  console.log("Index", index, "timer: ", timer);
  clearTimeout(hackingTimerID);
  if (index % 2 != 0) {
    await showProgressBar(timer);
  }
  return new Promise((resolve, reject) => {
    hackingTimerID = setTimeout(() => {
      resolve(updateArray[index]);
    }, timer);
  });
};

const showProgressBar = async (timer) => {
  let elmDiv = document.createElement("div");
  let showTimerID;
  container.appendChild(elmDiv).setAttribute("id", "progressBar");
  let progressBar = document.getElementById("progressBar");
  console.log("wait: ", timer);
  anmiTime = (timer - 200) / 1000;
  console.log("anmiTime: ", anmiTime);
  progressBar.style.animationDuration = anmiTime + "s";
  clearTimeout(showTimerID);
  showTimerID = setTimeout(() => {
    progressBar.remove();
  }, timer);
};

const stratHack = async (btnId) => {
  toggleBtnDisplay(btnId);
  createRainDropEffect("red");
  welcomeHeading.innerText = "Hacking";
  welcomePara.style.display = "none";

  container.style.display = "initial";
  let elmP = document.createElement("p");
  container.appendChild(elmP).setAttribute("id", "currentStatus");
  let timer = 1000;
  for (let i = 0; i < updateArray.length; i++) {
    if (i % 2 == 0) {
      let delay = 1500;
      currentValue = await getStatus(i, delay);
      elmP.style.textAlign = "center";
    } else {
      timer += 1500;
      currentValue = await getStatus(i, timer);
    }
    console.log(currentValue);
    elmP.innerText = currentValue;
  }
};

const displayWarning = () => {
  let warningDiv = document.createElement("div");
  warningDiv.innerText = "Hacking Stopped !";
  welcomeScreen.appendChild(warningDiv).setAttribute("id", "warningDiv");
};

const stopHack = async (btnId) => {
  clearTimeout(hackingTimerID);
  toggleBtnDisplay(btnId);
  resetAll = true;
  displayWarning();
  document.documentElement.style.setProperty("--color-font-heading", "red");
  document.documentElement.style.setProperty("--color-font", "red");
  container.style.display = "none";
};

function hackingHandler(isHacking, btnId) {
  if (isHacking) {
    stratHack(btnId);
  } else {
    stopHack(btnId);
  }
}

const clickHandler = (e) => {
  let btnId = e.target.id;
  if (target == null || target == "" || target == undefined) {
  } else {
    if (btnId == "startHackBtn") {
      isHacking = true;
      hackingHandler(isHacking, btnId);
    }
    if (btnId == "stopHackBtn") {
      isHacking = false;
      hackingHandler(isHacking, btnId);
    }
    if (btnId == "resetBtn") {
      if (resetAll == true) {
        reset(btnId);
      }
    }
  }
};

Array.from(document.querySelectorAll("button")).forEach((element) => {
  element.addEventListener("click", clickHandler);
});

const reset = async (btnId) => {
  document.getElementById("target").value = null;
  target = "";
  isHacking = false;
  createRainDropEffect("#1ce31c");
  toggleBtnDisplay(btnId);
  welcomeHeading.innerText = "Welcome to the world of Hacking!";
  welcomePara.style.display = "initial";
  container.style.display = "none";
  stopBtn.classList.remove("disabledBtn");
  stopBtn.classList.add("activeBtn");
  document.documentElement.style.setProperty("--color-font-heading", "#1ce31c");
  document.documentElement.style.setProperty("--color-font", "#1ce31c");
  document.getElementById("currentStatus").remove();
  document.getElementById("warningDiv").remove();
};
