function meeting(rooms_details, chairs_need){
	let chairs_taken_details = [];
	
	let ret = 'Game On';

	if(chairs_need < 0){
		ret = 'Nice try';
	}

	rooms_details.some(function(meeeting_room) {
		let chairs_avalbl = meeeting_room[1] - meeeting_room[0].length;
		let chairs_to_take = 0; 

		if(chairs_avalbl > 0) {
			chairs_to_take = (chairs_need >= chairs_avalbl)?chairs_avalbl:chairs_need;
		}
		chairs_need -= chairs_to_take
		
		chairs_taken_details.push(chairs_to_take);
		return chairs_need == 0;
	});

	if(chairs_taken_details.length>0){
		ret = chairs_taken_details;
	}
	return ret;
}

function formatChairs(count) {
	let ret = '';
	for (let i = 0; i<count; i++) {
		ret +=`X<i></i>`;
	}
	return ret;
}

function add() {
	let all  = (document.getElementById('all_count').value>0)?+document.getElementById('all_count').value:+document.getElementById('all_count').placeholder;
	let used = (document.getElementById('used_count').value>0)?+document.getElementById('used_count').value:+document.getElementById('used_count').placeholder;

	if(all < used) {
		all = used;
	}

	addRoom(all, used);
	document.getElementById('add_room').reset();
}

function addRoom(all, used) {
	document.getElementById('rooms').innerHTML += `<li class="room"><span class="used">${formatChairs(used)}</span><span class="free">${formatChairs(all - used)}</span></li>`;
}

function generateRooms() {
	document.getElementById('rooms').innerHTML = '';
	const rooms_count = Math.floor((Math.random() * 10) + 1);
	
	for (let i = 0; i<=rooms_count; i++) {
		const chairs_all = Math.floor((Math.random() * 10) + 1);
		const chairs_used = Math.floor((Math.random() * 10) + 1);
		addRoom(chairs_all,chairs_used);
	}
	return true;
}

function formatAnw(details, needed) {
	let ret = 'You have to take ';
	let found = 0;
	let sum = 0;
	for (let i=0; i < details.length; i++) {
		if(details[i] > 0) {
			found++;
			sum += details[i];
			ret += `${details[i]} chair(s) from room №${i+1} and `;
		}
	}
	if(found == 0) {
		ret = 'Oops all chairs are in use, try later';	
	} else {
		ret = ret.substr(0, ret.length-4);
		if(sum != needed){
			ret += 'and wait for more';	
		}
	}
	return ret;
}


function findChair() {
	let rooms_details = [];
	const rooms = document.body.querySelectorAll(".room");
	const needed = (document.getElementById('needed').value>0)?+document.getElementById('needed').value:+document.getElementById('needed').placeholder;

	rooms.forEach(function(room){

		const all = room.innerText.length;
		const used = room.getElementsByClassName('used')[0].innerText;

		rooms_details.push([used, all]);	
	});
	const chairs = meeting(rooms_details, needed);
	let anw = chairs;
	
	if(typeof chairs == 'object') {
		anw = formatAnw(chairs, needed);
	}
	
	setAnswer(anw, 'findChair');
}


//=======TicTacToe==========//

let move = 0;
let rowsMap = [[[0,0],[0,1],[0,2]],
			   [[0,0],[1,0],[2,0]],
			   [[0,0],[1,1],[2,2]],
			   [[1,0],[1,1],[1,2]],
			   [[2,0],[2,1],[2,2]],
			   [[0,1],[1,1],[2,1]],
			   [[0,2],[1,2],[2,2]],
			   [[2,0],[1,1],[0,2]],
			   ]
let values = [1,2];
let sign = ['X','O'];

function ticTacToe(el){
	let anw = '';
	let index = Math.floor(move%2); 

	el.querySelector('input').value = values[index];
	el.className += ` ${sign[index]}`;
	move++;
	let playgraund = [];
	const playgraund_el = document.body.querySelectorAll("#playgraund input");
	playgraund_el.forEach(input=>playgraund.push(+input.value));

	playgraund = [playgraund.splice(0,3),playgraund.splice(0,3),playgraund.splice(0,3)];
	
	const res = ticTacToeTest(playgraund);

	switch(res){
		case 1:
		case 2:
			anw = `The Player ${sign[res-1]} wins !!!`;	
			setAnswer(anw, 'ticTacToe');
		break;
		case -1:
			anw = `It's a draw`;
			setAnswer(anw, 'ticTacToe');
		break;
		default:
			//let's play 
		break;
	}
}

function testRow(row) {
	const isFilled = !row.includes(0);
	const sum = row.reduce((partialSum, a) => partialSum + a, 0);	
 
	
	if(isFilled && (sum == 3 || sum == 6)) {
		return sum/3;
	}
	if(isFilled) {
		return -1;
	}
	return 0;
}

function ticTacToeTest(playgraund) {
	let res = 0;
	let filled = 0;
	for (let i=0; i < rowsMap.length; i++) {
		let row = [];
		let rowRule = rowsMap[i];
		for (let j=0; j<3; j++){
			row.push( playgraund[rowRule[j][0]][rowRule[j][1]]);
		}
		res = testRow(row);
		if(res > 0) {
			return res;
		}
		filled+=res;
	}
	if(filled == -8) {
		res = -1;
	} else {
		res = 0;
	}	
	return res;
}

function playAgain() {
	move = 0;
	const playgraund_inputs = document.body.querySelectorAll("#playgraund input");	
	playgraund_inputs.forEach(input=>input.value = 0);
	const playgraund_el = document.body.querySelectorAll("#playgraund .field");	
	playgraund_el.forEach(el=>el.className = 'field');
	document.body.querySelector("#ticTacToe .answer").style.display = "none";
}
//========Calc==========//

function lazyWay(){
	const firstCalc = document.getElementById('firstCalc').value;
	const secondCalc = document.getElementById('secondCalc').value;
	const actionCalc = document.getElementById('actionCalc').value;

	const anw = `the Lazy result IS ${eval(firstCalc+actionCalc+secondCalc)}`;

	document.body.querySelector("#Calc .form").style.display = "none";
	setAnswer(anw, 'Calc');
}

function calc(first, second, action) {
	return '';
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
	document.body.querySelector("#"+tabName+" .text").innerText = answer;
	document.body.querySelector("#"+tabName+" .answer").style.display = "block";
}

function resetTab(tabName) {
	document.body.querySelector("#"+tabName+" .form").style.display = "block";
	let inputs = document.body.querySelectorAll("#"+tabName+" input");
	inputs.forEach(input => (input.type != 'submit')?input.value = "":'');
	document.body.querySelector("#"+tabName+" .answer").style.display = "none";
}
