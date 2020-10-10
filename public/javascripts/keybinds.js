const $ = require("../javascripts/jquery.min.js");

var keys = {};
var index;

$("input[type=text]").on("keyup", e => {
    keys[e.key.toUpperCase()] = false;
    setInput();
});

$("input[type=text]").on("keydown", e => {
    Object.keys(keys).forEach(g => {
        if (!keys[g])
            delete keys[g];
    });
    keys[e.key.toUpperCase()] = true;
    setInput();
});

function setInput() {
    $(".keybind-input").val(Object.keys(keys).toString().replace(/,/gi, " + "));
}

$(".add-keybind").click(() => {
    index = 0;
    resetKeyAdder();
    $(".dark-overlay").show().addClass("d-flex");
    $(".keybind-input").focus();
});

$(".cancel-btn").click(() => {
    $(".dark-overlay").hide().removeClass("d-flex");
    resetKeyAdder()
})

$(".done-btn").click(() => {
    switch (index) {
        case 0:
            $(".keybind-input").hide();
            $(".select-function").show();
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
})

function resetKeyAdder() {
    $(".keybind-input").show().prop("value", "");
    $(".select-function").hide();
    $(".done-btn").html("Next");
}