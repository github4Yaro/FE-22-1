import {SETTINGS} from './settings.js';
import {Dino} from './dino.js';
import {Fuel} from './fuel.js';

const dino = new Dino();

class Game {
	bg_block = document.getElementById('bg');
	area_block = document.getElementById('area');
	fuel_bock = document.getElementById('fuel');
	scores_block = document.getElementById('scores');
	best_block = document.getElementById('best');
	story_block = document.getElementById('story');
	start_btn = document.getElementById('startBtn');

	scores = 0;
	best = 0;
	id = null;
	fuel = null;
	constructor() {
		this.start_btn.addEventListener('click',(ev)=>{ ev.stopPropagation(); this.start(); return false;});
		this.best = +localStorage.getItem('best');
		this.printBestScores();
		this.printScores();
		this.fuel = new Fuel();
	}

	
	start(){
		if(!this.id) {
			this.story_block.style.display = 'none';
			this.scores = 0;
			this.id = setInterval(()=>this.tick(),2);
			this.addFuel();
			this.fuel.id = setInterval(()=>this.addFuel(), SETTINGS.fuel.interval);
			dino.start();
			this.bg_block.className = 'active';
		}
	}

	tick(){
		const status = dino.status();
		if(status.onPlay) {
			this.scores++;
		} else {
			this.stop();
		}
		this.updateInfo(status);

		if(this.fuel.el) {
			const fuel_position = this.fuel.move();	
			if(fuel_position.top > status.position && 
			   fuel_position.top < status.position + SETTINGS.dino.catch_window.t &&
			   fuel_position.left < SETTINGS.dino.catch_window.l2 &&
			   fuel_position.left > SETTINGS.dino.catch_window.l1) {
			   		dino.catchFuel();
					this.fuel.delete();
			} else if(fuel_position.left < 0) {
					this.fuel.delete();
			}
		}
	}

	addFuel() {
		this.fuel.create(this.area_block);
	}

	updateInfo(status) {
		this.fuel_bock.innerText = status.fuel;
		this.printScores();	
	}

	printScores() {
		const c = this.scores_block;
		const ctx = c.getContext("2d");
		ctx.clearRect(0, 0, c.width, c.height);
		ctx.fillStyle = "#d05e22";
		ctx.font = "22px dino-font";
		const scores = '000000'+this.scores;
		ctx.fillText(scores.slice(-6), 10, 25);	
	}

	printBestScores() {
		const best = '000000'+this.best;
		this.best_block.innerText = best.slice(-6);
	}

	stop(){
		clearInterval(this.id);
		this.fuel.stop();
		
		this.id = null;
		this.bg_block.classList.add('finished');
		this.story_block.style.display = 'flex';
		if(this.scores > this.best) {
			this.best = this.scores;
			localStorage.setItem('best', this.best);	
		}
		this.printBestScores();
	}
}
const game = new Game();