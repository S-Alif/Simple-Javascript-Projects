/* function to calculate result */
function calculate(){
    var sub1 = document.getElementById('sub1').value;
    var sub2 = document.getElementById('sub2').value;
    var sub3 = document.getElementById('sub3').value;
    var sub4 = document.getElementById('sub4').value;
    var sub5 = document.getElementById('sub5').value;

    /* validation */
    if (sub1 == "" || sub2 == "" || sub3 == "" || sub4 == "" || sub5 == ""){
        alert("one or more fields are empty");
    }else{
        var a = parseFloat(sub1) + parseFloat(sub2) + parseFloat(sub3) + parseFloat(sub4) + parseFloat(sub5);
        var gpa = getGpa(a / 5);
        var advice = getAdvice(gpa);

        /* showing result and advice */
        document.getElementById('show-result').textContent = `${gpa}`;
        document.getElementById('advice').textContent = advice;
    }
}

/* getting GPA */
function getGpa(a){
    if (a >= 80) {
        return 5.00;
    }
    else if (a >= 70) {
        return 4.00;
    }
    else if (a >= 60) {
        return 3.50;
    }
    else if (a >= 50) {
        return 3.00;
    }
    else if (a >= 40) {
        return 2.50;
    }
    else if (a >= 33) {
        return 2.00;
    }
    else {
        return 0.00;
    }
}

/* get advice */
function getAdvice(gpa){
    if(gpa >= 4.75){
        return "Excellent Result - Keep it up !!";
    }
    else if(gpa >= 4.50){
        return "Good Result - You can do better !!";
    }
    else if(gpa >= 4.00){
        return "You lack basics, you have the potential";
    }
    else if(gpa >= 3.50){
        return "Concentrate on the basics more";
    }
    else if(gpa >= 3.00){
        return "Follow class lectures properly";
    }
    else{
        return "Follow class lectured properly and practice more and more";
    }
}

function reset(){
    sub1.value = "";
    sub2.value = "";
    sub3.value = "";
    sub4.value = "";
    sub5.value = "";

    document.getElementById('show-result').textContent = "0.00";
    document.getElementById('advice').textContent = "Advice will be shown based on result";
}