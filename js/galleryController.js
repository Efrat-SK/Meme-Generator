'use strict'

function initGallery() {
    renderImgs()
    creatTagList()
    renderTugsList()
}

function renderImgs(imgs = getImgs()) {
    var strHTML = []
    imgs.forEach(img => {
        const { id, url } = img
        strHTML +=
            `<div class="img-container">
        <img class="img${id}" id=${id} src=${url} alt="img" onclick="onSelectImg(this.id)">
        </div>`
    })
    document.querySelector('.imgs-container').innerHTML = strHTML
}

function renderTugsList() {
    const tags = getTagsList()
    let strHTML = []
    for (const keyWord in tags) {
        strHTML += `<span class="tag" onclick="onTagClick('${keyWord}')" style="font-size:${10 + 1.5 * tags[keyWord]}px ;">${keyWord} &nbsp;</span>`
    }
    document.querySelector('.tag-list').innerHTML = strHTML
}

function onTagClick(keyWord){
    addTagClick(keyWord)
    renderTugsList()
    renderImgs( getFilterImgs(keyWord))
}

function onfilterImgs(value) {
    renderImgs( getFilterImgs(value))
}

function onSelectImg(imgId) {
    selectImg(imgId)
    initEditor()
    addClass('gallery', 'hidden')
    removeClass('editor', 'hidden')
}
