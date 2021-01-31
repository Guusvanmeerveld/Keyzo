const path = require("electron").remote.app.getAppPath();
const $ = require(path + "/src/javascripts/jquery.min.js");

// Predefine some vars
var keys = {},
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
