'use strict'

function renderPics() {
    const pics = getPics()
    var strHTMLs = pics.map(pic => {
        return `
         <img onclick="onSelectedPic(this)" src="${pic.imgUrl}" alt="">
          <button onclick="onRemovePic('${pic.id}')">x</button>
         `
    })
    document.querySelector('.pic-saved').innerHTML = strHTMLs.join('')
}

function onRemovePic(picId) {
    removePic(picId)
    renderPics()
}

function onSelectedPic(img) {
    document.querySelector('.editor').classList.remove('hidden')
    document.querySelector('.saved').classList.add('hidden')
    coverCanvasWithImg(img)
}

function coverCanvasWithImg(elImg = document.querySelector('img')) {
    gCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gCanvas.width
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function onSavePic() {
    clearFrame()
    setTimeout(() => {
        const imgUrl = gCanvas.toDataURL()
        addPic(imgUrl)
        renderPics()
        showModal()

        gMeme.selectedLineIdx = 0
        renderMeme()
    }, 100)
}


function showModal() {
    const modal = document.querySelector('.saved-msg')
    modal.style.display = 'block'
    setTimeout(() => {
        modal.style.display = 'none'
    }, 3000)
}
