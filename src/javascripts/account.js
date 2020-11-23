const Store = require('electron-store');
const store = new Store();

const $ = require("../javascripts/jquery.min.js")

fetch("https://google.com")
    .then(() => {
        $('#content').show().addClass("d-flex");
        if (!store.get("logged-in")) {
            console.log("Not logged in");
        }
    })
    .catch(() => {
        $('#error').show().addClass("d-flex");
    })
    .finally(() => {
        $('#loader').hide().removeClass("d-flex");
    });