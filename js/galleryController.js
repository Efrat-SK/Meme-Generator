'use strict'

function initGallery(){
    renderImgs()
}

function renderImgs() {
    var strHTML = []
    const imgs = getImgs()
    imgs.forEach(img => {
        const { id, url } = img
        strHTML += 
        `<div class="img-container">
        <img class="img${id}" id=${id} src=${url} alt="img" onclick="onSelectImg(this.id)">
        </div>`
    })
    document.querySelector('.imgs-container').innerHTML = strHTML
}

function onSelectImg(imgId){
    selectImg(imgId)
    initEditor()
    addClass('gallery' , 'hidden')
    removeClass('editor' , 'hidden')
}