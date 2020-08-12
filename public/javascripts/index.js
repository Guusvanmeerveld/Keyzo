const customTitlebar = require('custom-electron-titlebar');

new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#212121'),
    unfocusEffect: true,
    overflow: "auto",
    menu: null,
    titleHorizontalAlignment: 'left'
});

document.querySelectorAll(".nav-item").forEach(x => {
    x.addEventListener('click', e => {
        if (document.getElementById("main-page").getAttribute('src').indexOf(x.id) < 0) {
            document.getElementById("main-page").setAttribute('src', "pages/" + x.id + ".html")
            document.querySelectorAll(".nav-item").forEach(y => {
                y.classList.remove('active')
            })
            x.classList.add('active')
        }
    })
})