'use strict'
const STORAGE_KEY = 'memes'
var gElCanvas
var gCtx

function initEditor() {
    addListeners()
    initCanvas()
    renderMeme()
}

function initCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
}

function resizeCanvas() {
    let widths = [0, 450, 600, 1000]
    let elCanvas = document.querySelector('canvas')
    if (window.innerWidth >= widths[0] && window.innerWidth < widths[1]) {
        elCanvas.height = 250
        elCanvas.width = 250
        renderMeme()
    } else if (window.innerWidth >= widths[1] && window.innerWidth < widths[2]) {
        elCanvas.height = 300
        elCanvas.width = 300
        renderMeme()
    } else if (window.innerWidth >= widths[2] && window.innerWidth < widths[3]) {
        elCanvas.height = 400
        elCanvas.width = 400
        renderMeme()
    } else {
        elCanvas.height = 450
        elCanvas.width = 450
        renderMeme()
    }
}

function renderMeme(isDownload = false) {
    const { selectedImgId, selectedLineIdx, lines } = getMeme()
    const selector = `.img${selectedImgId}`
    const elMeme = document.querySelector(selector)

    gCtx.drawImage(elMeme, 0, 0, canvas.width, canvas.height)

    if (lines.length > 0 && !isDownload) {
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
        if (!isDownload) {
            gCtx.beginPath()
            gCtx.strokeStyle = 'white'
            gCtx.rect(20, yPos - size, canvas.width - 40, 1.3 * size)
            gCtx.stroke()
        }

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

    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
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
    setSelectedLine()
}

function onToggleLine() {
    toggleLine()
    renderMeme()
    setSelectedLine()
}

function setSelectedLine() {
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
    renderMeme(true)
    var link = document.createElement('a')
    link.download = 'my_meme.png'
    link.href = canvas.toDataURL()
    link.click()
    link.remove()
    renderMeme(false)
}
