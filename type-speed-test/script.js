/* array object that contains texts */
const texts = [
    "Scolding is something common in student life.Being a naughty boy, I am always scolded by my parents.But one day I was severely scolded by my English teacher.She infact teaches well",
    "Days are not of equal value in one\'s life. Some bring happiness while others bring sadness. Sadness and happiness both are equally important to man\'s life, since they are the two sides of a coin",
    "While she was teaching, I was completely engrossed in reading that book. Nancy Drew was caught in the trap laid by some smugglers and it was then when I felt a light tap on my bent head",
    "That night, I could not sleep and I cried a lot. For next few days, I bore the burden of this blame for being responsible for this unfortunate incident",
    "Studying is the main source of knowledge. Books are indeed never failing friends of man. For a mature mind, reading is the greatest source of pleasure and solace to distressed minds",
    "The various sufferings, endurance and joy described in books enable us to have a closer look at human life. They also inspire us to face the hardships of life courageously",
    "So we should read only the best and the greatest among them. With the help of books we shall be able to make our thinking mature and our life more meaningful and worthwhile",
    "A teacher is called builder of the nation. The profession of teaching needs men and women with qualities of head and heart. There are many teachers in our school and a large number of teachers among them are highly qualified",
    "She teaches us English. She is quite at home in this subject. She takes keen interest in teaching students. Simple living and high thinking is her motto",
    "When the class was over, I went to the teacher to apologize. When she saw that I had realized my mistake, she cooled down and then told me in a very kind manner how disheartening it was when she found any student not paying attention",
    "This cracker caught fire and a very loud explosion was heard which shook my sister and me. After that, we all could think of nothing else than blood stained cotton, bandage, dettol etc",
    "My cousin took my brother to the doctor where he got 14 stitches in his forefinger and thumb. But at home, everybody kept cursing and blaming me for the mishap"
];
/* get all the required things */
var displayedText = document.querySelector('.display-text p');
var textInBox = document.getElementById('typed-text');
var mistakes = document.getElementById('mistakes');
var time = document.getElementById('elasped-time');
var showAccuracy = document.getElementById('accuracy');
var words = document.getElementById('words');
var typedcharacters = document.getElementById('characters');
var minute = document.getElementById('minute');
var seconds = document.getElementById('second');

let total_mistakes = 0;
let complete = true;
let startTime;

/* generate a number or index position to get the text from array object */
var textNumber = Math.floor(Math.random() * texts.length);

/* everytime the window loads getText function will be called and new text will be loaded */
window.addEventListener('load', getText);

/* getting characters that are typed inside a span to process */
function getText(){
    var testText = texts[textNumber];

    testText.split('').forEach(element => {
        const mistype = document.createElement('span');
        mistype.innerText = element;
        displayedText.appendChild(mistype);
    });
};

/* timer */
function timer(){
    startTime = new Date();
    var timeSeconds = 0;
    setInterval(() => {
        timeSeconds = Math.round((new Date() - startTime) / 1000);

        if(timeSeconds < 10){
            seconds.textContent = 0 + ""+timeSeconds;
        }
        else if(timeSeconds == 60){
            timer();
        }else{
            seconds.textContent = timeSeconds;
        }

    }, 1000);
    setInterval(() => {
        minute.textContent = 0 + ""+Math.round((new Date() - startTime) / (1000 * 60));
    }, (1000 * 60));
}

/* start timer */

/* result process */
textInBox. addEventListener('input', () => {
    
    var typedText = textInBox.value;
    var forTest = typedText.split('');

    error = 0
    
    // show how many characters are typed
    typedcharacters.textContent = typedText.length;


    // check for mistakes and identify / show mistakes
    var checkText = displayedText.querySelectorAll('span');
    checkText.forEach((e, index) => {
        
        const indexText = forTest[index];
        
        if(indexText === e.innerText){
            e.style.color = "#000";
            e.style.textDecoration = "none";
        }
        else if(indexText == null){
            e.style.textDecoration = "none";
            complete = false;           
        }
        else{
            e.style.color = "red";
            e.style.textDecoration = "underline";
            error++;
            complete = false;
        }
    });

    if(complete){
        clearInterval(timer);
        textInBox.disabled = true;
    }

    // show mistakes
    mistakes.textContent = total_mistakes + error;

    // show corrects
    var corrects = typedText.length - (total_mistakes + error);
    var accuracy = Math.round((corrects / typedText.length) * 100);

    showAccuracy.textContent = accuracy + '%';
    if(accuracy < 0 || accuracy == isNaN){
        showAccuracy.textContent = 0 + '%';
    }
    
});