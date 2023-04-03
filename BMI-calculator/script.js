window.addEventListener('load', showBmi);

// function to create BMI result elements
function showBmi(){
    // create popup body
    let bmiContainer = document.createElement('div'); 
    bmiContainer.id = "bmi-container";

    // create content body
    let bmiContent = document.createElement("div");
    bmiContent.id = "content";

    bmiContainer.appendChild(bmiContent);

    // create h3 tag for title
    let bmiTitle = document.createElement("h3")
    bmiTitle.classList = "title";
    bmiTitle.innerHTML = "bmi result";
    bmiContent.appendChild(bmiTitle);

    // create 'p' tags to show height and weight and bmi
    let bmiHeight = document.createElement("p");
    bmiHeight.id = "height";
    let bmiweight = document.createElement("p");
    bmiweight.id = "weight";
    let yourBmi = document.createElement("p");
    yourBmi.id = "yourBmi";

    bmiContent.appendChild(bmiHeight);
    bmiContent.appendChild(bmiweight);
    bmiContent.appendChild(yourBmi);

    // a 'p' tag to show BMI
    let bmiResult = document.createElement("p");
    bmiResult.id = "result";
    bmiContent.appendChild(bmiResult);
    
    // an OK btn to close the popup
    let okBtn = document.createElement("button");
    okBtn.id = "ok-btn";
    okBtn.classList = "btn";
    okBtn.innerText = "OK";
    bmiContent.appendChild(okBtn);
    
    okBtn.addEventListener('click', function(){
        document.getElementById("bmi-container").classList.remove("show");
    })

    // add BMI result popup to body
    document.body.appendChild(bmiContainer);
}

// function to calculate BMI
function calculateBmi(height, weight){
    let bmi = weight / (height * height);
    return bmi;
}

// main BMI function
function bmi(){
    // get height and weight and weight value
    let weight = document.getElementById("weightInput").value;
    let height = document.getElementById("heightInput").value;

    if(height === '' || weight === ''){
        document.getElementById("alert").classList.add("open");
        setTimeout(() => {
            document.getElementById("alert").classList.remove("open");
        }, 3200);
    }else{
        // get the calculated result
        let result = calculateBmi(parseFloat(height), parseFloat(weight));

        let showResult = document.getElementById("result");
        document.getElementById("bmi-container").classList.add("show");

        // printing height and weight
        document.getElementById("height").innerHTML = "<b>Your Height :</b> "+parseFloat(height)+"m";
        document.getElementById("weight").innerHTML = "<b>Your weight :</b> "+parseFloat(weight)+"Kg";
        document.getElementById("yourBmi").innerHTML = "<b>Your BMI :</b> "+result.toFixed(2);

        // check the result and show appropriate message
        if(result < 15){
            showResult.innerHTML = "starvation 😰";
        }
        else if(result >= 15.1 && result <= 17.5){
            showResult.innerHTML = "anorexic 🤮";
        }
        else if(result >= 17.6 && result <= 18.5){
            showResult.innerHTML = "underweight 😑";
        }
        else if(result >= 18.6 && result <= 24.9){
            showResult.innerHTML = "ideal 😍";
        }
        else if(result >= 25 && result <= 25.9){
            showResult.innerHTML = "overweight 😎";
        }
        else if(result >= 30 && result <= 30.9){
            showResult.innerHTML = "obese 😮";
        }
        else{
            showResult.innerHTML = "morbidly obese 😖";
        }
    }
}