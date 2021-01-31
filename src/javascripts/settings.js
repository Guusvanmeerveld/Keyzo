const Store = require("electron-store");
const store = new Store();

const path = require("electron").remote.app.getAppPath();

const $ = require(path + "/src/javascripts/jquery.min.js");

const settings = ["minimize", "startup", "startup-min"];

settings.forEach((setting) => {
  $(`#${setting}-label`).click(() => {
    let checked = $(`#${setting}`).prop("checked");
    store.set(setting, checked);

    if (setting == "startup") {
      disabledArea();
    }
  });

  $(`#${setting}`).prop("checked", store.get(setting));
});

function disabledArea() {
  if (store.get("startup")) {
    $(".startup-min").removeClass("disabled-item");
  } else {
    $(".startup-min").addClass("disabled-item");
    $("#startup-min").prop("checked", false);
    store.set("startup-min", false);
  }
}

disabledArea();
