function calSize() {
    const heigth = +document.getElementById('heigthItem').value;
    const diameter = +document.getElementById('diameterItem').value; 

    if (heigth == '' || diameter == '') {
        return false;
    }

    const size = Math.PI * heigth * (diameter/2)**2
    const anw = `Обьем целиндра ${size.toFixed(4)} ед`;

    setAnswer(anw, 'size');
}

function abbr() {
	const firstName = document.getElementById('firstName').value;
	const lastName = document.getElementById('lastName').value;
	const middleName = document.getElementById('middleName').value;

	const abbr = (lastName[0]+firstName[0]+((typeof middleName[0] !='undefined')?middleName[0]:'')).toUpperCase();
	const anw = `Ваша аббревиатура ${abbr}`;

	setAnswer(anw, 'abbr');
}

function avgAmount() {
	const firstMonth = +document.getElementById('firstMonth').value;
	const secondMonth = +document.getElementById('secondMonth').value;
	const thirdMonth = +document.getElementById('thirdMonth').value;

	const avgAmount = (firstMonth + secondMonth + thirdMonth) / 3;
	const anw = `Средняя прибыль за квартал ${avgAmount} денег `;

	setAnswer(anw, 'avg');
}

function sayHello() {
	const name = document.getElementById('userName').value;
	const anw = `Привет, ${name}!`;

	setAnswer(anw, 'sayHello');
}

function revert() {
	let num = +document.getElementById('tNumber').value;
	const sign = Math.sign(num);
	const DELIMITER = 10;
	let revert = 0;

	num = num * sign;
	while(num>=1) {
		revert = revert*DELIMITER + num%DELIMITER;
		num = Math.trunc(num/DELIMITER);
	} 
	revert = revert * sign; 
	
	const anw = `Разворот числа равен, ${revert}`;

	setAnswer(anw, 'revert');
		
}

function speed() {
	const distance = +document.getElementById('distance').value;
	const time = +document.getElementById('time').value;

	const speed = (distance/time).toFixed(0);
	const anw = `Скорость должна быть не менее ${speed} км/ч`;

	setAnswer(anw, 'speed');
}

function perSquere() {
	const sqLength = +document.getElementById('sqLength').value;
	const perSquere = 4*sqLength;
	const anw = `Периметр квадрата равен ${perSquere} ед`;

	setAnswer(anw, 'perSquere');
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
	document.body.querySelector("#"+tabName+" .text").innerText = answer;
	document.body.querySelector("#"+tabName+" .answer").style.display = "block";
}

function resetTab(tabName) {
	document.body.querySelector("#"+tabName+" .form").style.display = "block";
	let inputs = document.body.querySelectorAll("#"+tabName+" input");
	inputs.forEach(input => input.value = "");
	document.body.querySelector("#"+tabName+" .answer").style.display = "none";
}
