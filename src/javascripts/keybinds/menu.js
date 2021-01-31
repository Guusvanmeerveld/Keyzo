const c = document.createElement.bind(document);
const q = document.querySelector.bind(document);

const functions = require(path + "/json/functions.json");
var showsFunctions = [];

// Load functions from json
function init() {
  cycleList(functions, "", 0);
}

function cycleList(list, title, i) {
  let div = c("div");

  showsFunctions[i] = {};
  list.forEach((item) => {
    showsFunctions[i][item.title] = false;
    div.appendChild(createListItem(i, item.title, item.description));
    if (item.children) {
      cycleList(item.children, item.title.replace(/ /g, ""), i + 1);
    }
  });

  if (title) div.classList.add(title);
  q(".select-function-" + i).appendChild(div);
}

function createListItem(which, t, s) {
  let showsFunctionsLocal = showsFunctions[which],
    title = c("div"),
    trailing = c("i"),
    subtitle = c("div"),
    noSpace = t.replace(/ /g, "");

  title.classList.add("category-item");
  title.classList.add("bold");
  title.innerHTML = t.toUpperCase();

  trailing.classList.add("category-arrow");
  trailing.classList.add("material-icons");
  trailing.innerHTML = "arrow_forward_ios";

  title.addEventListener("click", () => {
    showsFunctionsLocal[t] = !showsFunctionsLocal[t];

    Object.keys(showsFunctionsLocal).forEach((i) => {
      if (t !== i) {
        showsFunctionsLocal[i] = false;
        // console.log("Clicked: " + t, "Did not click: " + i);
        $("." + i.replace(/ /g, "")).hide();
      }
    });

    // console.log(showsFunctions, which, t);

    if (showsFunctionsLocal[t]) {
      $(".select-function-" + (which + 1)).show();
      $("." + noSpace).show();
    } else {
      $(".select-function-" + (which + 1)).hide();
      $("." + noSpace).hide();
    }
  });

  subtitle.classList.add("text-muted");
  subtitle.innerHTML = s;

  title.appendChild(trailing);

  if (s) title.appendChild(subtitle);

  return title;
}

init();
