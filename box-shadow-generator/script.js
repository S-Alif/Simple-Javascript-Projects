// get necessary Elements
var sliders = document.querySelectorAll('.slider')
var showOutput = document.getElementById('show-out')
var code = document.querySelector('.code-out')

// for showing the codes
var type = document.getElementById('type')
var xOff = document.getElementById('x-offset')
var yOff = document.getElementById('y-offset')
var blur = document.getElementById('blurr')
var spread = document.getElementById('spread')
var red = document.getElementById('red')
var green = document.getElementById('green')
var blue = document.getElementById('blue')
var opacity = document.getElementById('opacity')


sliders.forEach((e) => {
    e.addEventListener('input', () => {
        // get values of everything
        var offX = document.getElementById('offset-x').value
        var offy = document.getElementById('offset-y').value
        var blur_rad = document.getElementById('blur-rad').value
        var spread_rad = document.getElementById('spread-rad').value
        var shd_type = document.getElementById('shadow-type').value
        var color = document.getElementById('color').value
        var color_op = document.getElementById('color-opac').value
        var r = parseInt(color.substr(1, 2), 16)
        var g = parseInt(color.substr(3, 2), 16)
        var b = parseInt(color.substr(5, 2), 16)

        // change the style
        showOutput.style.boxShadow = `${shd_type} ${offX}px ${offy}px ${blur_rad}px ${spread_rad}px rgba(${r}, ${g}, ${b}, ${color_op})`

        // show the codes
        type.innerText = shd_type
        xOff.innerText = offX
        yOff.innerText = offy
        blur.innerText = blur_rad
        spread.innerText = spread_rad
        red.innerText = r
        green.innerText = g
        blue.innerText = b
        opacity.innerText = color_op
    })
})


// copy the code
code.addEventListener('click', () => {
    var range = document.createRange()
    range.selectNodeContents(code)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand('copy')
})