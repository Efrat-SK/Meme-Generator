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
    let tagListStrHTML = ''
    let searchBoxStrHTML = ''
    for (const keyWord in tags) {
        tagListStrHTML += `<span class="tag" onclick="onTagClick('${keyWord}')" 
        style="font-size:${10 + 1.5 * tags[keyWord]}px ;">${keyWord} &nbsp;</span>`

        searchBoxStrHTML += `<option value="${keyWord}">`
    }
    tagListStrHTML += `<br /><div class="tag show-all" onclick="onTagClick('all')" 
    style="font-size:20px; "><u>show all</u></div>`

    const elTagWords = document.querySelector('.tag-list')
    elTagWords.innerHTML = tagListStrHTML
    const elSearchWords = document.querySelector('[name=box-search-words]')
    elSearchWords.innerHTML = searchBoxStrHTML
}

function onTagClick(keyWord) {
    if (keyWord === 'all') {
        renderSerchBox('')
        renderImgs()
    }
    else {
        addTagClick(keyWord)
        renderTugsList()
        renderSerchBox(keyWord)
        renderImgs(getFilterImgs(keyWord))
    }

}

function renderSerchBox(keyWord) {
    const elSearchWords = document.querySelector('[name="keywords-search-box"]')
    console.log('elSearchWords: ', elSearchWords)
    console.log('keyWord: ', elSearchWords.value)
    elSearchWords.value = keyWord
}

function onfilterImgs(value) {
    renderImgs(getFilterImgs(value))
}

function onSelectImg(imgId) {
    selectImg(imgId)
    initEditor()
    addClass('gallery', 'hidden')
    removeClass('editor', 'hidden')
}
