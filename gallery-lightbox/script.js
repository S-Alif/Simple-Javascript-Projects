/* get all the things needed */
var links = document.querySelectorAll('.zoom');
var modal = document.getElementById('modal-gallery');
var showImg = document.getElementById('show-img');
var closeBtn = document.getElementById('close-btn')
var hrefs;

links.forEach((e) => {
    e.addEventListener('click', function(elm){
        elm.preventDefault();
        var hrefs = e.getAttribute('href');
        showImg.setAttribute('src', hrefs);
        modal.classList.add('open');
    })
});

closeBtn.onclick = function(){
    modal.classList.remove('open');
}