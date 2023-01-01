/* faq : accordion */

// getting the box
var box = document.querySelectorAll('.box');

// getting the question div
var ques = document.querySelectorAll('.question');

ques.forEach(function(elm){
    elm.addEventListener('click', (e) => {
        elm.parentElement.classList.toggle('open');
    })
})