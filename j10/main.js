class Timer {
	circles = [];
	time = 0;
	timerId = false;
	timerBlock = document.getElementById('timer');
	circleBlock = document.getElementById('circle_list');

	start(){
		if(!this.timerId) {
			this.timerId = setInterval(() => this.tick(), 100);
		}
	};
	stop(){
		this.pause();
		this.time = 0;
		this.circles = [];
		this.timerBlock.innerText = this.formatTime();
		this.circleBlock.innerHTML = '';
	};
	pause(){
		clearInterval(this.timerId);
		this.timerId = false;
	};
	circle(){
		if (this.time > 0){
			this.circles.push(this.formatTime());
		}
		this.circleBlock.innerHTML = this.circles.reduce((html,circle)=> html + `<li>${circle}</li>`,'');
	};
	tick(){
		this.time += 1;
		this.timerBlock.innerText = this.formatTime();
	};
	formatTime() {
		const millisec = this.time % 10;
		const sec = '0' + Math.trunc(this.time/10)%60;
		const minutes = '0' + Math.trunc(Math.trunc(this.time/10)/60);
		return `${minutes.slice(-2)}:${sec.slice(-2)}:${millisec}`;
	}
}

const timer = new Timer();