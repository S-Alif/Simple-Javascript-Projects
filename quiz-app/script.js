// get all imports
import { get_data_easy } from "./getdata.js"
import { get_data_medium } from "./getdata.js"
import { get_data_hard } from "./getdata.js"

/*========================== get all needed elements ===========================*/
let preloader = document.querySelector('.preloader')
let info_tab = document.querySelector('.info')
let rules_tab = document.querySelector('.rules')
let diff_tab = document.querySelector('.difficulty')
let diff_box = document.querySelectorAll('.difficult-box .box')
let ques_tab = document.querySelector('.question-tab')
let result_tab = document.querySelector('.result')
let score_tab = document.querySelector('.score-board')
let correct_ans = document.getElementById('correct-ans')
let show_auto_seconds = document.getElementById('seconds')
let select_category = document.getElementById('select-category')

/*========================== get the buttons ===========================*/
let take_quiz_btn = document.getElementById('take-quiz')
let start_quiz_btn = document.getElementById('start-quiz')
let diff_btn = document.getElementById('diff-btn')
let next_btn = document.getElementById('next-btn')
let show_score_btn = document.getElementById('show-score')
let take_quiz_again_btn = document.getElementById('take-quiz-again')

/*========================== for showing questions / time / question count ===========================*/
let question_box = document.getElementById('question-box')
let option_label = document.querySelectorAll('.options .opt')
let ques_count = document.querySelector('#count')

/*========================== elements for showing results ===========================*/
let show_time = document.getElementById('time')
let show_percent = document.getElementById('percent')
let show_corrects = document.getElementById('counting')

/*========================== necessary variables ===========================*/
var questions = []
let counter = -1
let result = 0
var minute = 10
var seconds = 60

let data = {}
let mode = ""
let chances = 2

/*========================== after the window loads ===========================*/
window.onload = () => {
    // select the loading bar
    let loading_bar = preloader.querySelector('.preloader .preloader-bar')

    // loading bar animation
    let bar = 0
    let loading = setInterval(() => {
        bar++
        loading_bar.style.width = `${bar}%`
        if(bar == 99){
            clearInterval(loading)
        }
    }, 30)

    // remove the preloader
    setTimeout(() => {
        preloader.classList.add('close')
    }, 3800)

    // check the local storage
    if (!localStorage.getItem('user-data')) {
        info_tab.classList.add('open')
        // set the data for localStorage
    }
    else {
        show_score()
        score_tab.classList.add('open')
    }
}


/*========================== clicking on take quiz btn ===========================*/
take_quiz_btn.onclick = () => {
    let error_msg = document.querySelector('.error-msg')
    let user_name = document.getElementById('info-name').value
    let user_email = document.getElementById('info-email').value
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // input validation
    if ((user_name == "null" || user_name.length < 3) || !user_email.match(validRegex)){
        error_msg.classList.add('open')
        setTimeout(() => {
            error_msg.classList.remove('open')
        }, 2500)
    }
    else{
        // remove info tab
        setTimeout(() => {
            info_tab.classList.remove('open')
        }, 200)
        
        // load rules tab
        setTimeout(() => {
            rules_tab.classList.add('open')
        }, 500)

        // saving data on localStorage and declare an array of data
        data = {
            userName: `${user_name}`,
            userEmail: `${user_email}`,

            easy_current_time: "",
            medium_current_time: "",
            hard_current_time: "",
            
            easy_current_percent: "",
            medium_current_percent: "",
            hard_current_percent: "",

            easy_current_correct_ans: "",
            medium_current_correct_ans: "",
            hard_current_correct_ans: "",

            easy_prev_time: "",
            medium_prev_time: "",
            hard_prev_time: "",
            
            easy_prev_percent: "",
            medium_prev_percent: "",
            hard_prev_percent: "",

            easy_prev_correct_ans: "",
            medium_prev_correct_ans: "",
            hard_prev_correct_ans: "",

            easy_best_time: "",
            medium_best_time: "",
            hard_best_time: "",
            
            easy_best_percent: "",
            medium_best_percent: "",
            hard_best_percent: "",

            easy_best_correct_ans: "",
            medium_best_correct_ans: "",
            hard_best_correct_ans: "",
        }

        // save the user info to the localStorage
        localStorage.setItem('user-data', JSON.stringify(data))
    }
}

/*========================== clicking on 'start quiz' btn ===========================*/
start_quiz_btn.onclick = () => {

    // remove rules tab
    setTimeout(() => {
        rules_tab.classList.remove('open')
    }, 200)

    // load difficulty tab
    setTimeout(() => {
        diff_tab.classList.add('open')
    }, 500)
}

/*========================== selecting difficulty ===========================*/
diff_box.forEach((e) => {
    var current = e.querySelector(".img-box")

    current.addEventListener("click", () => {
        diff_box.forEach((e2) => {
            if (e2 != e) {
                e2.classList.remove("clicked")
            } else {
                e2.classList.add("clicked")

                //   change the color of selection button to the color of difficulty
                var bg = getComputedStyle(e2.lastElementChild)
                diff_btn.style.backgroundColor = `${bg.backgroundColor}`
            }
        })
    })
})

/*========================== get the questions ===========================*/
async function get_easy_questions(){
    let data = await get_data_easy()
    return data
}
async function get_medium_questions(){
    let data = await get_data_medium()
    return data
}
async function get_hard_questions(){
    let data = await get_data_hard()
    return data
}

/*========================== clicking on 'select' btn on difficulty tab ===========================*/
diff_btn.onclick = () => {

    minute = 10
    seconds = 59

    // getting the question of selecting difficulty
    diff_box.forEach(async e => {
        if(e.classList.contains('clicked')){
            if(e.id == "easy"){
                questions.push(await get_easy_questions())
                show_questions()
                mode = "easy"
            }
            else if(e.id == "medium"){
                questions.push(await get_medium_questions())
                show_questions()
                mode = "medium"
            }
            else{
                questions.push(await get_hard_questions())
                show_questions()
                mode = "hard"
            }
        }
    })

    // remove difficulty tab
    setTimeout(() => {
        diff_tab.classList.remove('open')
    }, 200)

    // load questions tab
    setTimeout(() => {
        ques_tab.classList.add('open')
        setTimeout(timer, 1000)      /* start timer */
    }, 500)
}


/*======================= starting timer to get the total time taken for the quiz ===================*/
function timer() {
    minute--

    window.second_counter = setInterval(() => {
        seconds--
        if (seconds < 0) {
            seconds = 59
        }
    }, 1000)

    window.minute_counter = setInterval(() => {
        minute--
    }, 60000)
}


/*========================== show questions and options ===========================*/
function show_questions() {
    counter++
    if (counter < 10) {
        // start the timer
        go_to_next_question()

        // getting random question
        var quesLength = questions[0].length
        var ques = questions[0][Math.floor(Math.random() * quesLength)]
        var quesIndex = questions[0].indexOf(ques)
        questions[0].splice(quesIndex, 1)

        question_box.innerText = ques.Q
        correct_ans.value = ques.correct

        // getting random option
        for (var i = 0; i < 4; i++) {
            let opt = ques.opt[Math.floor(Math.random() * ques.opt.length)]
            let optIndex = ques.opt.indexOf(opt)
            ques.opt.splice(optIndex, 1)

            option_label[i].lastElementChild.innerText = `${opt}`
            option_label[i].firstElementChild.value = `${opt}`
        }

        // showing quiz count
        ques_count.innerHTML = counter + 1
        ques_count.nextElementSibling.innerHTML = 10
    }

    // some functions based on the question counter
    if (counter == 10 - 1) {
        next_btn.innerText = "Submit"
        next_btn.style.background = "#00bb38"
    }
    if (counter == 10) {

        // stop the countdown
        clearInterval(window.second_counter)
        clearInterval(window.minute_counter)

        // remove question tab
        ques_tab.classList.remove("open")

        // show the results
        setTimeout(() => {
            show_result()
        }, 500)
    }
}


/*========================== click next button on question tab ===========================*/
next_btn.onclick = () => {
    clearInterval(window.time_gone)
    if (counter < 10) {
        check_ans()
        show_questions()
    }
}

/*======================= checking answer =====================*/
function check_ans() {
    for (var i = 0; i < 4; i++) {
        if (option_label[i].firstElementChild.checked) {
            if (option_label[i].firstElementChild.value === correct_ans.value) {
                result++
            }
            option_label[i].firstElementChild.checked = false
            break
        }
    }
}


/*========================== going to the next question after 60 seconds ===========================*/
function go_to_next_question(){
    let time_left = 59
    show_auto_seconds.innerHTML = time_left
    show_auto_seconds.style.backgroundColor = "#3178fc"

    window.time_gone = setInterval(() => {
        time_left--
        
        if(time_left < 0){
            time_left = 59
            clearInterval(window.time_gone)
            check_ans()
            show_questions()

            show_auto_seconds.innerHTML = time_left
        }

        if(time_left < 26){
            show_auto_seconds.style.backgroundColor = "#00bb38"
        }

        if(time_left < 10){
            show_auto_seconds.innerHTML = "0" + time_left
            show_auto_seconds.style.backgroundColor = "#ff2c2c"
        }
        else{
            show_auto_seconds.innerHTML = time_left
        }
    }, 1000)
}


/*========================== showing result ===========================*/
function show_result(){

    // calculating results in the variables
    let minute_taken = 9 - minute
    let seconds_taken = 59 - seconds
    let correct_answers = result
    let percentage = (result / 10) * 100

    // show the result
    show_time.innerText = `${minute_taken} : ${seconds_taken}`
    show_percent.innerText = `${percentage}%`
    show_corrects.innerText = `${correct_answers} / 10`

    // load the result tab
    result_tab.classList.add('open')

    // save the result in localStorage
    var storage_data = JSON.parse(localStorage.getItem('user-data'))

    // check if current time exists
    if (storage_data[`${mode}_current_time`] == ""){

        storage_data[`${mode}_current_time`] = `${minute_taken} : ${seconds_taken}`
        storage_data[`${mode}_current_percent`] = percentage
        storage_data[`${mode}_current_correct_ans`] = correct_answers

        // best time
        storage_data[`${mode}_best_time`] = `${minute_taken} : ${seconds_taken}`
        storage_data[`${mode}_best_percent`] = percentage
        storage_data[`${mode}_best_correct_ans`] = correct_answers

        localStorage.setItem('user-data', JSON.stringify(storage_data))
    }
    else{
        store_data(minute_taken, seconds_taken, percentage, correct_answers)
    }
}


/*========================== 
store results in the local storage after
test of the same time has been take once
 ===========================*/
 function store_data(minute, second, percent, count){
    var storage_data = JSON.parse(localStorage.getItem('user-data'))

    //  finding the best score
    let curr_time = minute * 60 + second
    let best_time = parseInt(storage_data[`${mode}_best_time`].substring(0, 1)) * 10 + parseInt(storage_data[`${mode}_best_time`].substring(4, 6))
    let curr_perc = percent
    let best_perc = parseInt(storage_data[`${mode}_best_percent`])

    storage_data[`${mode}_prev_time`] = storage_data[`${mode}_current_time`]
    storage_data[`${mode}_prev_percent`] = storage_data[`${mode}_current_percent`]
    storage_data[`${mode}_prev_correct_ans`] = storage_data[`${mode}_current_correct_ans`]

    storage_data[`${mode}_current_time`] = `${minute} : ${second}`
    storage_data[`${mode}_current_percent`] = percent
    storage_data[`${mode}_current_correct_ans`] = count

    if((curr_time < best_time) && (curr_perc >= best_perc)){
        // best time
        storage_data[`${mode}_best_time`] = `${minute} : ${second}`
        storage_data[`${mode}_best_percent`] = percent
        storage_data[`${mode}_best_correct_ans`] = count
    }

    localStorage.setItem('user-data', JSON.stringify(storage_data))
 }


/*========================== show data according to changed mode ===========================*/
select_category.onchange = () => {
    show_score()
}


/*========================== show the data in score tab ===========================*/
function show_score(){
    let getMode = `${select_category.value}`

    let storage_data = JSON.parse(localStorage.getItem('user-data'))

    document.getElementById('show-name').innerText = `${storage_data['userName']}`
    
    // show the data
    if(storage_data[`${getMode}_current_time`]){
        document.getElementById('curr-time').innerText = `${storage_data[`${getMode}_current_time`]}`
        document.getElementById('curr-perc').innerText = `${storage_data[`${getMode}_current_percent`]}%`
        document.getElementById('curr-corr').innerText = `${storage_data[`${getMode}_current_correct_ans`]}/10`
    }
    else{
        document.getElementById('curr-time').innerText = " - "
        document.getElementById('curr-perc').innerText = " - "
        document.getElementById('curr-corr').innerText = " - "
    }

    if(storage_data[`${getMode}_prev_time`]){
        document.getElementById('pre-time').innerText = `${storage_data[`${getMode}_prev_time`]}`
        document.getElementById('pre-perc').innerText = `${storage_data[`${getMode}_prev_percent`]}%`
        document.getElementById('pre-corr').innerText = `${storage_data[`${getMode}_prev_correct_ans`]}/10`
    }
    else{
        document.getElementById('pre-time').innerText = " - "
        document.getElementById('pre-perc').innerText = " - "
        document.getElementById('pre-corr').innerText = " - "
    }

    if(storage_data[`${getMode}_best_time`]){
        document.getElementById('best-time').innerText = `${storage_data[`${getMode}_best_time`]}`
        document.getElementById('best-perc').innerText = `${storage_data[`${getMode}_best_percent`]}%`
        document.getElementById('best-corr').innerText = `${storage_data[`${getMode}_best_correct_ans`]}/10`
    }
    else{
        document.getElementById('best-time').innerText = " - "
        document.getElementById('best-perc').innerText = " - "
        document.getElementById('best-corr').innerText = " - "
    }
}


/*========================== clicking on 'show score' button on result tab ===========================*/
show_score_btn.onclick = () => {

    //remove result tab
    result_tab.classList.remove('open')

    // load score tab
    show_score()
    score_tab.classList.add('open')
}


/*========================== clicking on 'take quiz again' button on score tab ===========================*/
take_quiz_again_btn.onclick = () => {

    // reset all variables
    reset_all()
    
    // remove score tab
    score_tab.classList.remove('open')

    // load diffuculty tab
    diff_tab.classList.add('open')
}

/*========================== reset everything ===========================*/
function reset_all(){
    
    questions.pop()
    counter = -1
    result = 0
    minute = 10
    seconds = 60
    mode = ""
    chances = 2

    diff_box.forEach(async e => {
        if (e.classList.contains('clicked')) {
            e.classList.remove('clicked')
        }
    })

    next_btn.innerText = "Next"
    next_btn.style.background = "#3178fc"
}

/*========================== warning messege when window defocuses ===========================*/
document.onvisibilitychange = () => {

    let msg = document.getElementById('chance')
    let tab = document.querySelector('.warning-msg')

    if(ques_tab.classList.contains('open')){
        if(document.visibilityState == 'hidden'){
            chances--
            if (chances < 0) {

                clearInterval(window.time_gone)
                clearInterval(window.second_counter)
                clearInterval(window.minute_counter)

                tab.firstElementChild.innerText = "You are disqualified"
                msg.style.opacity = 0
                tab.classList.add('open')

                setTimeout(() => {
                    tab.classList.remove('open')
                }, 5000)

                setTimeout(() => {
                    show_result()
                    ques_tab.classList.remove('open')
                    result_tab.classList.add('open')
                }, 5500)
            }
            else {
                msg.innerText = `You have ${chances} chances left`
                tab.classList.add('open')
            }
        }
        if(document.visibilityState == 'visible'){
            setTimeout(() => {
                tab.classList.remove('open')
            }, 5000)
        }
    }
}