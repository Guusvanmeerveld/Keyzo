fetch("https://accounts.keyzo.com")
    .then(() => {
        console.log("yeet");
    })
    .catch(() => {
        document.getElementById('error').classList.remove('d-none')
        document.getElementById('error').classList.add('d-flex')
    })
    .finally(() => {
        document.getElementById('loader').classList.add('d-none')
        document.getElementById('loader').classList.remove('d-flex')
    })