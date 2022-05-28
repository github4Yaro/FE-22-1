

function findNum() {
    const firstNum = +document.getElementById('firstNum').value;
    const secondNum = +document.getElementById('secondNum').value;
    
    if(isNaN(firstNum) || isNaN(secondNum) || firstNum >= secondNum) {
        resetTab('findNum');
        alert('Ошибка входных данных');
        return false;
    }

    let start = Math.trunc(firstNum/10);
    let end   = Math.trunc(secondNum/10);
    let check = firstNum%10;

    
    if(start < check && check != 0) {
        start ++;
    }
    
    check = secondNum%10;
    if(end > check || check == 0) {
        end --;
    }

    let anw = ''; 
    for (let i = start; i<=end; i++){
        anw += `${i}${i}`;
        if(i<end){
          anw += ', '; 
        }
    }
    setAnswer(anw, 'findNum');
}

function drawingSym() {
    const symbol = document.getElementById('symbol').value;
    const length = +document.getElementById('length').value;

    if(isNaN(length)) {
        resetTab('drawingSym');
        alert('Ошибка входных данных');
        return false;    
    }

    let anw = '';
    for (let i=0; i<length; i++) {
        anw += `${symbol}`;
    }
    setAnswer(anw, 'drawingSym');
}

function dragonSlayer() {

    let count = 0;
    let maxPower = 1;
    do{
        count++;
        let power = prompt('введите количество голов');
        maxPower *= power;
    } while(confirm('добавить дракона?'));

    let anw = `<div>Драконов зарегистрировано ${count}</div><div>Расчетная мощь ${maxPower} голов</div>`;
    setAnswer(anw, 'dragonSlayer');
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