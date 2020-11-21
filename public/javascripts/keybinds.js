const app = require("electron").remote.app;
const path = app.getAppPath();

const q = document.querySelector.bind(document);
const c = document.createElement.bind(document);

const $ = require(path + "/public/javascripts/jquery.min.js");
const functions = require(path + "/json/functions.json");

// Predefine some vars
var keys = {};
var index;

// Detect keybinds
$(".keybind-input").on("keyup", (e) => {
  keys[e.key.toUpperCase()] = false;
  setInput();
});

$(".keybind-input").on("keydown", (e) => {
  e.preventDefault();

  Object.keys(keys).forEach((g) => {
    if (!keys[g]) delete keys[g];
  });

  keys[e.key.toUpperCase()] = true;
  setInput();
});

function setInput() {
  $(".keybind-input").val(Object.keys(keys).toString().replace(/,/gi, " + "));
}

// Configure buttons
$(".add-keybind").click(() => {
  index = 0;
  $(".dark-overlay").show().addClass("d-flex");
  $(".keybind-input").focus();
});

$(".cancel-btn").click(() => {
  $(".dark-overlay").hide().removeClass("d-flex");
  resetKeyAdder();
});

$(".done-btn").click(() => {
  switch (index) {
    case 0:
      $(".keybind-input").hide();
      $(".customize").show().addClass("container-fluid");
      $(".done-btn").html("Done");
      break;
    case 1:
      $(".dark-overlay").hide().removeClass("d-flex");
      resetKeyAdder();

      break;
    default:
      break;
  }
  index++;
});

function resetKeyAdder() {
  $(".keybind-input").show().val("");
  $(".customize").hide();
  $(".done-btn").html("Next");
}

// Load functions from json
Object.keys(functions).forEach((func) => {
  let title = c("div");

  title.classList.add("category-item");
  title.classList.add("bold");
  title.innerHTML = func.toUpperCase();

  title.addEventListener("click", () => {
    $(".select-function").toggle();
  });

  let trailing = c("i");

  trailing.classList.add("category-arrow");
  trailing.classList.add("material-icons");
  trailing.innerHTML = "arrow_forward_ios";

  let subtitle = c("div");
  subtitle.classList.add("text-muted");
  subtitle.innerHTML = functions[func].description;

  title.appendChild(subtitle);
  title.appendChild(trailing);
  q(".select-category").appendChild(title);
});
