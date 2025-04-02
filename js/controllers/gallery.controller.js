'use strict'

function renderGallery() {
    let imgs = gImgs
    let strHTMLs = imgs.map(img =>
        `<img src="${img.url}" onclick="onSelectImg('${img.id}')">`)
    document.querySelector('.gallery').innerHTML = strHTMLs.join('')
}