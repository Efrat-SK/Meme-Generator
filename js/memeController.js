'use strict'
const STORAGE_KEY = 'memes'
var gElCanvas
var gCtx

function initEditor() {
    initCanvas()
    renderMeme()
}

function initCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()
    addListeners()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function renderMeme() {
    const { selectedImgId, selectedLineIdx, lines } = getMeme()
    const selector = `.img${selectedImgId}`
    const elMeme = document.querySelector(selector)

    gCtx.drawImage(elMeme, 0, 0, canvas.width, canvas.height)

    if (lines.length > 0) {
        const { size, yPos } = lines[selectedLineIdx]
        gCtx.beginPath()
        gCtx.globalAlpha = 0.5
        gCtx.fillStyle = 'white'
        gCtx.fillRect(20, yPos - size, canvas.width - 40, 1.3 * size)
        gCtx.globalAlpha = 1
        gCtx.stroke()
    }
    lines.forEach(line => {
        const { txt, size, align, fillColor, strokeColor, yPos, fontFamily } = line
        gCtx.beginPath()
        gCtx.strokeStyle = 'white'
        gCtx.rect(20, yPos - size, canvas.width - 40, 1.3 * size)
        gCtx.stroke()

        gCtx.beginPath()
        gCtx.textAlign = align
        gCtx.font = `${size}px ${fontFamily}`
        gCtx.fillStyle = fillColor
        gCtx.strokeStyle = strokeColor
        gCtx.fillText(txt, canvas.width / 2, yPos)
        gCtx.strokeText(txt, canvas.width / 2, yPos)
        gCtx.stroke()
    })
}

function getMemeHight() {
    return canvas.height
}

function addListeners() {
    const elTextBox = document.querySelector('.txtInput')
    elTextBox.addEventListener('input', onTextChange)
    const elSColor = document.querySelector('.stroke-color-input')
    elSColor.addEventListener('input', onStrokeColorChange)
    const elFColor = document.querySelector('.fill-color-input')
    elFColor.addEventListener('input', onFillColorChange)
}

function onTextChange(ev) {
    editLine(ev.target.value)
    renderMeme()
}

function onStrokeColorChange(ev) {
    const newColor = ev.target.value
    colorChange('stroke', newColor)
    renderMeme()
}

function onFillColorChange(ev) {
    const newColor = ev.target.value
    colorChange('fill', newColor)
    renderMeme()
}

function onEdit(action) {
    console.log('edit: ', action)
    editTextProperties(action)
    renderMeme()
}

function onSetTextFont(newFont) {
    console.log('newFont: ', newFont)
    setTextFont(newFont)
    renderMeme()
}

function onMoveLine(direction) {
    moveLine(direction)
    renderMeme()
}

function onAddNewLine() {
    addNewLine()
    renderMeme()
}

function onToggleLine() {
    toggleLine()
    renderMeme()
    const { txt, fillColor, strokeColor, fontFamily } = getSelectedLine()

    document.querySelector('.txtInput').value = txt
    document.querySelector('.stroke-color-input').value = strokeColor
    document.querySelector('.fill-color-input').value = fillColor
    document.querySelector('.family-font-select').value = fontFamily
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onDownload() {
    var link = document.createElement('a')
    link.download = 'my_meme.png'
    link.href = canvas.toDataURL()
    link.click()
    link.remove()
//     console.log('canvas.toDataURL(): ', canvas.toDataURL())
//     saveToStorage(STORAGE_KEY, canvas.toDataURL())

//     var dataURL = localStorage.getItem(canvasName)
//     var img = new Image;
//     img.src = dataURL;
//     console.log('img: ', img)
}