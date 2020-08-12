const { storage } = require('electron-json-storage');

document.getElementById("minimize-label").addEventListener('click', e => {
    storage.set('settings', { minimize: document.getElementById("minimize").checked })
    document.getElementById("minimize-label").innerHTML = storage.get('settings');
})