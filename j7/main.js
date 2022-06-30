
function randomIntFromInterval(min, max) { // min and max included 
 	return Math.floor(Math.random() * (max - min + 1) + min)
}
//===========Focus============//
const cart_liers = ['hearts','clubs','spades','diamond'];
const cart_values = ['K','Q','J',10,9,8,7,6,5,4,3,2,1];

function getCart() {
	const el = document.getElementById('cart');
	const cart_lier  = cart_liers[randomIntFromInterval(0, 3)];
	const cart_value = cart_values[randomIntFromInterval(0, 12)];

	el.className = 'cart';
	el.className += ` select-${cart_lier}`;
	setTimeout(function() {el.className += ` select-${cart_value}`},3000);
}
//===========Run============//
const runners_list = ['chiken','fox','tiger','pig','crab','cow'];
const runners_colors = ['chiken','fox','tiger','pig','crab','cow'];
let runners = [];

function Runner(name, stat) {
	this.name = name;
	this.stat = stat;
	this.min = this.stat.reduce((min, run) => (min > run.time)?run.time:min, 20);
	this.max = this.stat.reduce((max, run) => (max < run.time)?run.time:max, 0);	
}

function randStat() {
	return [{'time':randomIntFromInterval(10, 20)}, {'time':randomIntFromInterval(10, 20)}, {'time':randomIntFromInterval(10, 20)}];
}




function genRunners() {
	runners_list.forEach(runner_name => runners.push(new Runner(runner_name,randStat())));	
	console.log(runners);
}


//========user generator=====//
const female = ['Mary','Patricia','Jennifer','Linda','Elizabeth','Barbara','Susan','Jessica','Sarah','Karen','Lisa','Nancy','Betty','Margaret','Sandra','Ashley','Kimberly','Emily','Donna','Michelle','Carol','Amanda','Dorothy','Melissa','Deborah','Stephanie','Rebecca','Sharon','Laura','Cynthia','Kathleen','Amy','Angela','Shirley','Anna','Brenda','Pamela','Emma','Nicole','Helen','Samantha','Katherine','Christine','Debra','Rachel','Carolyn','Janet','Catherine','Maria','Heather','Diane','Ruth','Julie','Olivia','Joyce','Virginia','Victoria','Kelly','Lauren','Christina','Joan','Evelyn','Judith','Megan','Andrea','Cheryl','Hannah','Jacqueline','Martha','Gloria','Teresa','Ann','Sara','Madison','Frances','Kathryn','Janice','Jean','Abigail','Alice','Julia','Judy','Sophia','Grace','Denise','Amber','Doris','Marilyn','Danielle','Beverly','Isabella','Theresa','Diana','Natalie','Brittany','Charlotte','Marie','Kayla','Alexis','Lori'];
const male = ['James','Robert','John','Michael','David','William','Richard','Joseph','Thomas','Charles','Christopher','Daniel','Matthew','Anthony','Mark','Donald','Steven','Paul','Andrew','Joshua','Kenneth','Kevin','Brian','George','Timothy','Ronald','Edward','Jason','Jeffrey','Ryan','Jacob','Gary','Nicholas','Eric','Jonathan','Stephen','Larry','Justin','Scott','Brandon','Benjamin','Samuel','Gregory','Alexander','Frank','Patrick','Raymond','Jack','Dennis','Jerry','Tyler','Aaron','Jose','Adam','Nathan','Henry','Douglas','Zachary','Peter','Kyle','Ethan','Walter','Noah','Jeremy','Christian','Keith','Roger','Terry','Gerald','Harold','Sean','Austin','Carl','Arthur','Lawrence','Dylan','Jesse','Jordan','Bryan','Billy','Joe','Bruce','Gabriel','Logan','Albert','Willie','Alan','Juan','Wayne','Elijah','Randy','Roy','Vincent','Ralph','Eugene','Russell','Bobby','Mason','Philip','Louis'];

function User(name, age, gender) {
	this.name = name;
	this.age = age;
	this.gender = gender;
}

function randUser(gender) {
	const name = eval(gender)[randomIntFromInterval(0,99)];
	const age  = randomIntFromInterval(1, 100);
	return  new User(name, age, gender);
}

function user(){
	const gender = document.body.querySelector('input[name="gender"]:checked').value;
	const user = randUser(gender);
	const ans = `<div class="${user.gender}">${user.name} (age ${user.age})</div>`;
	setAnswer(ans,'user');
}

//========TABS=========//
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
	document.body.querySelector("#"+tabName+" .text").innerHTML = answer;
	document.body.querySelector("#"+tabName+" .answer").style.display = "block";
}

function resetTab(tabName) {
	document.body.querySelector("#"+tabName+" .form").style.display = "block";
	let inputs = document.body.querySelectorAll("#"+tabName+" input");
	inputs.forEach(input => (input.type != 'submit')?input.value = "":'');
	document.body.querySelector("#"+tabName+" .answer").style.display = "none";
}

