var textBox = document.getElementById('text-box');

textBox.addEventListener('input', function(){

    var showWord = document.getElementById('words');
    var showLetter = document.getElementById('letters');

    var texts = document.getElementById('text-box').value;;
    var textSize = texts.trim().split(' '); /* split the whiite space */

    var wordCount = 0;
    var letterCount = 0;
    
    showLetter.textContent = "Charachters : " + letterCount;

    /* count words */
    if(textSize.length >= 1){
        for (var j = 0; j < textSize.length; j++) {
            if (textSize[i] != " ") {
                wordCount++;
                showWord.textContent = "Words : " + wordCount;
            }
        }
    }

    /* count letters */
    for(var i = 0; i < texts.length; i++){
        letterCount++;
        showLetter.textContent = "Charachters : " + letterCount;
    }

    /* if letter is 0 then there is no word */
    if (letterCount <= 1) {
        var wordCount = 0;
        showWord.innerHTML = "Words : " + wordCount;
    }

});