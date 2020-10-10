const customTitlebar = require('custom-electron-titlebar');
const $ = require("./javascripts/jquery.min.js")

var titleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#292929'),
    icon: "icon/icon.png"
});

function init() {
    document.querySelectorAll(".nav-item").forEach(x => {
        x.addEventListener('click', () => {
            if ($("#main-page").prop('src').indexOf(x.id) < 0) {
                $("#main-page").prop('src', `pages/${x.id}.html`);
                document.querySelectorAll(".nav-item").forEach(y => {
                    y.classList.remove('active')
                })
                x.classList.add('active')
            };
        });
    });
    document.querySelectorAll(".nav-item")[0].classList.add("active")
};

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        init();
    }
};