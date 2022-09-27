// constants to get various html elements 

const select = document.querySelectorAll('.currency');
const button = document.getElementById('btn1');
const number_box = document.getElementById('number_box');
const toout = document.getElementById('toout');
const exrate = document.getElementById('Exrates');

// fetching api
fetch('https://api.frankfurter.app/currencies')
.then((response) => response.json())
.then((data) => {
    show(data);
});

// function to show the country options to use
function show(data){
    const asArray = Object.entries(data);

    for (let i=0; i<asArray.length; i++){

        select[0].innerHTML += `<option value="${asArray[i][0]}">${asArray[i][1]}</option>`;//3
        select[1].innerHTML += `<option value="${asArray[i][0]}">${asArray[i][1]}</option>`;//3
    }
}

// function to get the input values from the user
button.addEventListener('click', () => {
    let currency_one = select[0].value;
    let currency_two = select[1].value;
    let value1 = number_box.value;

    if(currency_one != currency_two){ 
        convert(currency_one, currency_two, value1);
        var e = document.getElementById("sel1");
        var value = e.value;
        var text = e.options[e.selectedIndex].value;
        document.getElementById("fromout").innerHTML = value1+" "+e.value;

    }else{
        alert('choose the currency');
    }

});


// function to convert the currency
function convert(currency_one, currency_two, value){ 
    const host = 'api.frankfurter.app'; 
    fetch(`https://${host}/latest?amount=${value}&from=${currency_one}&to=${currency_two}`)
    .then((val) => val.json())
    .then((val) => {
        toout.value = Object.values(val.rates)[0];
        var e = document.getElementById("sel2");
        var value = e.value;
        var text = e.options[e.selectedIndex].value;
        exrate.value = toout.value / number_box.value;
        toout.value += " ";
        toout.value += e.value;
    })
}

// function to reset the values to zero
function clearVal(){
    // window.location.reload();
    document.getElementById('Exrates').innerHTML = "";
}