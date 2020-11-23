const app = require("electron").remote.app;
const path = app.getAppPath();

const q = document.querySelector.bind(document);
const c = document.createElement.bind(document);

const $ = require(path + "/src/javascripts/jquery.min.js");
const functions = require(path + "/json/functions.json");

// Predefine some vars
var keys = {},
  showsFunctions = {},
  keybind;

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
  keybind = Object.keys(keys).join(" + ");

  if (Object.values(keys).filter((k) => k).length == 0) {
    $(".keybind-input").hide();
    $(".customize").show();
  }

  $(".show-keybind").html(keybind);
  $(".keybind-input").val(keybind);
}

// Configure buttons
$(".add-keybind").click(() => {
  $(".dark-overlay").show().addClass("d-flex");
  $(".keybind-input").show().focus();
});

$(".cancel-btn").click(resetKeyAdder);
$(".done-btn").click(resetKeyAdder);

$(".change-btn").click(() => {
  $(".keybind-input").show().focus().val("");
  $(".customize").hide();
});

function resetKeyAdder() {
  $(".dark-overlay").hide().removeClass("d-flex");

  $(".keybind-input").val("");
  $(".customize").hide();
  $(".done-btn").hide();

  keybind = null;
}

// Load functions from json
Object.keys(functions).forEach((cat) => {
  let catNoSpace = cat.replace(/ /g, "");
  // Select category
  let catagoryItem = createCatagoryItem(cat, catNoSpace),
    catagoryFunctions = c("div"),
    functionItems = createFunctionItem(functions[cat]);

  q(".select-category").appendChild(catagoryItem);

  catagoryFunctions.classList.add(catNoSpace);
  catagoryFunctions.style.display = "none";

  functionItems.forEach((item) => {
    catagoryFunctions.appendChild(item);
  });

  q(".select-function").appendChild(catagoryFunctions);
});

function createCatagoryItem(f, noSpace) {
  let title = c("div"),
    trailing = c("i"),
    subtitle = c("div");

  title.classList.add("category-item");
  title.classList.add("bold");
  title.innerHTML = f.toUpperCase();

  title.addEventListener("click", () => {
    showsFunctions[f] = !showsFunctions[f] ?? true;

    Object.keys(showsFunctions).forEach((i) => {
      if (f !== i) {
        showsFunctions[i] = false;
        $("." + i.replace(/ /g, "")).hide();
      }
    });

    if (showsFunctions[f]) {
      $(".select-function").show();
      $("." + noSpace).show();
    } else {
      $(".select-function").hide();
      $("." + noSpace).hide();
    }
  });

  trailing.classList.add("category-arrow");
  trailing.classList.add("material-icons");
  trailing.innerHTML = "arrow_forward_ios";

  subtitle.classList.add("text-muted");
  subtitle.innerHTML = functions[f].description;

  title.appendChild(subtitle);
  title.appendChild(trailing);

  return title;
}

function createFunctionItem(f) {
  delete f.description;
  var result = [];

  Object.keys(f).forEach((func) => {
    result.push(createFunctionItem(func, f[func].description));
  });

  return result;
}

function createListItem(title, subtitle) {
  let titleEl = c("div"),
    trailing = c("i"),
    subtitleEl = c("div");

  titleEl.classList.add("category-item");
  titleEl.classList.add("bold");
  titleEl.innerHTML = title.toUpperCase();

  trailing.classList.add("category-arrow");
  trailing.classList.add("material-icons");
  trailing.innerHTML = "arrow_forward_ios";

  subtitleEl.classList.add("text-muted");
  subtitleEl.innerHTML = subtitle;

  titleEl.appendChild(trailing);
  titleEl.appendChild(subtitleEl);
  return titleEl;
}
