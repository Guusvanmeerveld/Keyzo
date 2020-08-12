document.querySelectorAll('.keybind-input').forEach(x => {
    x.addEventListener('click', e => {
        document.addEventListener('keyup', keyup)
        document.addEventListener('keydown', keydown)
        setTimeout(() => document.addEventListener('click', submit), 10)
    })
    function keydown(f) {
        var key = f.key.toUpperCase()
        if (x.id) {
            x.value = key
            x.removeAttribute('id')
        }
        if (x.value.indexOf(key) < 0) {
            x.value += " + " + key
        }
    }
    function keyup(f) {
        var key = f.key.toUpperCase()
        if (x.value.indexOf(key) > -1) {
            x.id = true
        }
    }
    function submit() {
        document.removeEventListener('keyup', keyup)
        document.removeEventListener('keydown', keydown)
        document.removeEventListener('click', submit)
    }
})