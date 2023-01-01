/* easy way */

// var counter = document.getElementById('counter');
// var increase = document.getElementById('increase');
// var decrease = document.getElementById('decrease');
// var reset = document.getElementById('reset');

// var a = 0;


// /* increase the counter */
// increase.onclick = function(){
//     a = a + 1;
//     counter.innerHTML = a;
// }

// /* decrease the counter */
// decrease.onclick = function(){
//     a = a - 1;
//     counter.innerHTML = a;
// }

// /* reset the counter */
// reset.onclick = function(){
//     a = 0
//     counter.innerHTML = a;
// }



/* better way */

var counter = document.getElementById('counter');
var control = document.querySelectorAll('.btn');

var a = 0;

control.forEach(function(btn){
    btn.addEventListener('click', (e) => {

        console.log(e.currentTarget.classList);
        // check class
        var classes = e.currentTarget.classList;

        if(classes.contains('increase')){
            a++;
        }else if(classes.contains('decrease')){
            a--;
        }else{
            a = 0;
        }
        counter.textContent = a;
    })
});