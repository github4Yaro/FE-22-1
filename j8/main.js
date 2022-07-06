/// +++++++ MARKER ++++++++ ///
const Marker = function(color){
	this.color = color;
	this.fill = 100;
	this.print = function(text) {
		let answ = `<div style="color:${this.color}">`;
		while(this.fill > 0 && text.length>0) {
			for(let i = 0; i < text.length && this.fill > 0; i++) {
				answ += text[i];
				if(!/\s/g.test(text[i])) {
					this.fill -= 0.5;	
				}	
			}
			answ += ' ';
		}
		answ += '</div>';
		return answ
	}
}

function print() {
	const color = document.querySelector('.colors input:checked').value;
	const text = document.getElementById('P_string').value;
	const marker = new Marker(color);
	setAnswer(marker.print(text), 'marker');
}
/// +++++++ MARKER ++++++++ ///

/// +++++++ Circle +++++++++ ///

let circle = {
	R:null,
	set radius(radius) {
		this.R = radius;
	},

	get radius() {
		return this.R;
	},

	get diameter() {
		return this.R * 2;
	},

	get square() {
		return Math.PI * this.R**2;
	},

	get circuit() {
		return 2 * Math.PI * this.R;
	}

}

function demo() {
	const radius = +document.getElementById('radius').value;
	let answ = 'Radius has to be a number';
	if(!isNaN(radius)) {
		circle.radius = radius;
		answ = `circle = {radius : ${circle.radius}, diameter: ${circle.diameter}, square: ${circle.square}, circuit:${circle.circuit}}; `;
	}
	setAnswer(answ,'circle');
}

/// +++++++ Circle +++++++++ ///

/// +++++IP++++ ////

function ipsBetween(ip1, ip2) {
	ip1Parts = ip1.split('.');
	ip2Parts = ip2.split('.');
	
}

/// +++++IP++++ ////



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