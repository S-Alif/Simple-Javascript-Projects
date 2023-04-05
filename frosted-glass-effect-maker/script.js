var slider = document.querySelectorAll('.slider')
var showcase = document.getElementById('showcase')
var copyBtn = document.getElementById('copyBtn')

// for showing the values
var red = document.getElementById('red')
var green = document.getElementById('green')
var blue = document.getElementById('blue')
var colorOpacity = document.getElementById('color-opacity')
var blurr = document.getElementById('blurr')
var border_size = document.getElementById('brd-size')
var border_opacity = document.getElementById('brd-opacity')
var boxShadow = document.getElementById('shd-opacity')


slider.forEach((e) => {
    e.addEventListener('input', () => {
        var opacity = document.getElementById('opacity').value
        var filter_blur = document.getElementById('filter-blur').value
        var mainColor = document.getElementById('main-color').value
        var borderSize = document.getElementById('border-size').value
        var borderOpacity = document.getElementById('border-opacity').value
        var shadow = document.getElementById('shadow').value
        var r = parseInt(mainColor.substr(1, 2), 16)
        var g = parseInt(mainColor.substr(3, 2), 16)
        var b = parseInt(mainColor.substr(5, 2), 16)

        // passing changed values
        showcase.style.background = `rgba(${r}, ${g}, ${b}, ${opacity})`
        showcase.style.backdropFilter = `blur(${filter_blur}px)`
        showcase.style.border = `${borderSize}px solid rgba(255, 255, 255, ${borderOpacity})`
        showcase.style.boxShadow = `0 0 20px rgba(0,0,0, ${shadow})`

        // showing the values
        red.innerText = r
        green.innerText = g
        blue.innerText = b
        colorOpacity.innerText = opacity
        blurr.innerText = filter_blur
        border_size.innerText = borderSize
        border_opacity.innerText = borderOpacity
        boxShadow.innerText = shadow

        // change button text
        copyBtn.innerText = 'Click to copy'
    })
})

// copying code to clipboard
copyBtn.addEventListener('click', () => {
    var range = document.createRange()
    range.selectNodeContents(document.getElementById('code'))
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand('copy')
    copyBtn.innerText = 'style copied'
    window.getSelection().removeAllRanges()
})