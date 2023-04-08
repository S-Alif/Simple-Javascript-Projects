function check_input(){
    var num = document.getElementById('number')
    var terms = document.getElementById('terms')
    var table = document.querySelector('.show-table')

    if(num.value == ''){
        num.style.borderColor = 'red'
    }
    else if(terms.value == ''){
        terms.style.borderColor = 'red'
    }
    else{
        table.style.display = 'block'
        calculate_table(num.value, terms.value)
    }
}

function calculate_table(num, terms){
    var show_table = document.getElementById('show-output')
    
    // remove previous append data
    while(show_table.hasChildNodes()){
        show_table.removeChild(show_table.firstChild)
    }

    // append new data
    for(var i = 1; i <= terms; i++){
        show_table.append(num+" X "+i+" = "+num * i+"\n")
    }
}