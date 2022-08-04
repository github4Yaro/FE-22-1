class Clock {
	dateBlock = document.getElementById('date');
	timeBlock = document.getElementById('time');
	constructor() {
		this.tick();
		setInterval(() => this.tick(), 1000);
	}
	tick() {
		const time = new Date();
		const time_parts = time.toString().split(' ');
		this.dateBlock.innerText = `${time_parts[1]} ${time_parts[2]}`;
		this.timeBlock.innerText = time_parts[4];
	}
}

class Clicker {
	counter = 0;
	totalCount = 0;
	stat = [];
	timerId = null;
	period = 30;
	startButton = document.getElementById('startBtn');
	clickArea = document.querySelector('#clickArea>div');

	counterArea = document.getElementById('counter');
	timerArea = document.getElementById('timer');
	avgArea = document.getElementById('avg');

	statTable = document.getElementById('statTable');

	constructor() {
		this.updateBar();
		this.clickArea.addEventListener('click', () => this.counter++);
	}

	updateBar() {
		this.timerArea.innerText = this.period.toFixed(2);
		this.counterArea.innerText = this.counter;
		let avg = 0;
		if(this.stat.length>0){
			avg = (this.totalCount/this.stat.length)*2;
		}
		this.avgArea.innerText = avg.toFixed(0);
	}

	start() {
		if(!this.timerId) {
			this.timerId = setInterval(() => this.tick(), 10);	
		}
		this.startButton.style.display = "none";
		this.clickArea.style.display = "block";
		
	}

	stop() {
		clearInterval(this.timerId);
		this.timerId = null;
		const uName = prompt('Finished!!! Enter your name');
		if(uName) {
			this.stat.push({name:uName, count:this.counter});
			this.totalCount += this.counter;
			this.printStat();
		}
		this.startButton.style.display = "block";
		this.clickArea.style.display = "none";
		this.counter = 0;
		this.period = 30;
	}

	printStat() {
		let table = "<tr><th>#</th><th>Name</th><th>score</th></th>";
		table += this.stat.reduce((html, row, index)=> html + `<tr><td>${index+1}</td><td>${row.name} </td><td> ${row.count}</td></td>`,'');	
		this.statTable.innerHTML = table;
	}

	tick() {
		this.period -= 0.01;
		if(this.period <=0) {
			this.stop();
		}
		this.updateBar();
	}
}
