import {SETTINGS} from './settings.js';

export class Dino{
	dino_el = document.getElementById('dino');
	fuel = 0;
	cur_H = 0;
	id = null;
	constructor() {
		window.addEventListener('click', ()=>this.jump());
	}

	start(){
		if(!this.id) {
			this.fuel = SETTINGS.dino.start_F;
			this.cur_H = SETTINGS.dino.start_H;
			this.scores = 0;
			this.id = setInterval(()=>this.move(), 12);
		}
	}
	move(){
		if(this.cur_H > SETTINGS.bg.min) {
			this.cur_H --;
			this.dino_el.style = `bottom:${this.cur_H}px; transition: bottom 0.011s linear`;
		} else {
			this.fuel = 0;
			this.stop();
		}	
	}
	catchFuel() {
		this.fuel+=10;
	}
	status(){
		return {'onPlay':(this.id),'fuel':this.fuel,'position':this.cur_H};
	}
	stop(){
		clearInterval(this.id);
		this.id = false;
	}
	jump() {
		if(this.fuel > 0){
			this.fuel--;
			let new_H = this.cur_H + SETTINGS.dino.jump;
			if(new_H > SETTINGS.bg.max) {
				new_H = SETTINGS.bg.max;	
			}
			this.cur_H = new_H;
			this.dino_el.style.bottom = `${new_H}px`;
		}
	}
}