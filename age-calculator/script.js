// close the age container
function close_age_container(){
    document.querySelector('.age-container').classList.remove('open')
}

// show the age
function show_age(year, month, days){
    var ageContainer = document.querySelector('.age-container')
    var hbt = document.getElementById('hbt')
    var normalTitle = document.getElementById('normal-title')
    var showYear = document.getElementById('year')
    var showMonth = document.getElementById('month')
    var showDays = document.getElementById('days')

    hbt.style.display = "none"

    if((year > 0) && (month == 0) && (days == 0)){
        hbt.style.display = "block"
        normalTitle.style.display = "none"
        ageContainer.classList.add('open')
        showYear.innerHTML = "You are <b>"+year+"</b> years old"
    }
    else{
        ageContainer.classList.add('open')
        if(days == 0){
            showYear.innerHTML = "You are <b>"+year+"</b> years"
            showMonth.innerHTML = " and <b>"+month+"</b> months old"
        }else{
            showYear.innerHTML = "You are <b>"+year+"</b> years,"
            showMonth.innerHTML = "<b>"+month+"</b> months,"
            showDays.innerHTML = " and <b>"+days+"</b> days old"
        }
    }
}

// calculate age
function calculate_age(dob){
    var year, month, days

    // get birthday month / date / year
    let birth = {
        year: dob.getFullYear(),
        month: dob.getMonth(),
        date: dob.getDate()
    }

    // get current year / month / date
    let today = new Date()
    let current = {
        year: today.getFullYear(),
        month: today.getMonth(),
        date: today.getDate()
    }

    // calculate year
    year = current.year - birth.year
    
    // calculate month
    if(current.month >= birth.month){
        month = current.month - birth.month
    }
    else{
        year--
        month = 12 + current.month - birth.month
    }

    // calculate date
    if(current.date >= birth.date){
        days = current.date - birth.date
    }
    else{
        month--
        days = 31 + current.date - birth.date

        if(month < 0){
            month = 11
            year--
        }
    }

    // pass the values to show the age
    show_age(year, month, days);
}

// check the input
function check_input(){
    let alert = document.querySelector('.alert')
    let showAlert = document.getElementById('show-alert')
    var getDob = document.getElementById('birthday').value
    
    // chceck input
    if(getDob == null || getDob == ""){
        showAlert.innerHTML = "Plaese enter your birth date"
        alert.classList.add('show')
        setTimeout(() => {
            alert.classList.remove('show')
        }, 3200)
    }
    else{
        // pass date to the function
        var dob = new Date(getDob)
        calculate_age(dob);
    }
}