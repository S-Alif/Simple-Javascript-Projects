var acdnBox = document.querySelectorAll('.acdn-box')

acdnBox.forEach((e) => {
    var acdnTitle = e.querySelector('.title')

    acdnTitle.addEventListener('click', () => {
        acdnBox.forEach((e2) => {
            if(e2 != e){
                e2.classList.remove('open')
            }
            else{
                e2.classList.toggle('open')
            }
        })
    })
})