
function happyTicket() {
    const ticketNum = document.getElementById('ticketNum').value;
    if(ticketNum == '') {
        return false;
    }
    const parts = ticketNum.split('');
    let first = 0;
    let second = 0;
    for (let i = 0; i<parts.length; i ++) {
        if(i<3){
            first +=  +parts[i];  
        } else {
            second +=  +parts[i];
        }
    }
    let res = "<b class='error'>не счастливый</b>";
    if(first == second) {
        res = "<b class='success'>счастливый</b>";
    }

    const anw = `Билет  ${ticketNum} ${res}`;
    setAnswer(anw, 'happyTicket');
}

function secretPlace() {
    const ticketNum = +document.getElementById('trTicket').value;  
    const placeType = (ticketNum%2)?'нижнее':'верхнее';
    let coupeNum = 0;
    let coupeType = 'в купе';

    if(ticketNum > 36) {
        coupeNum = 10 - Math.ceil((ticketNum - 36) / 2);
        coupeType = 'сбоку';
    } else {
        coupeNum = Math.ceil(ticketNum/4);
    }

    const anw = `Ваше купе <b>№${coupeNum}</b> место ${coupeType}  ${placeType}`;
    setAnswer(anw, 'secretPlace');
}

function tempHelper() {
    const tempC = document.getElementById('tempC').value;
    
    if(tempC != +tempC) {
        return false;
    }
    const tempF = (tempC * 9/5) + 32 ;
    const anw = `Результат:  ${tempF}<sup>o</sup>F`;

    setAnswer(anw, 'tempHelper');
}




function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function setAnswer(answer, tabName) {
	document.body.querySelector("#"+tabName+" .form").style.display = "none";
	document.body.querySelector("#"+tabName+" .text").innerHTML = answer;
	document.body.querySelector("#"+tabName+" .answer").style.display = "block";
}

function resetTab(tabName) {
	document.body.querySelector("#"+tabName+" .form").style.display = "block";
	let inputs = document.body.querySelectorAll("#"+tabName+" input");
	inputs.forEach(input => input.value = "");
	document.body.querySelector("#"+tabName+" .answer").style.display = "none";
}