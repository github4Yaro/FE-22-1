import {SETTINGS} from './settings.js';


export class Fuel {
	id = null;
	el = null;
	left = 0;
	top = 0;
	create(bg) {
		this.top = Math.floor(Math.random() * (SETTINGS.bg.max - SETTINGS.bg.min + 1) + SETTINGS.bg.min);
		this.left = SETTINGS.fuel.start_L;
		const el = document.createElement("div");
		el.className = 'fuel';
		el.style.bottom = this.top+'px';
		el.style.left = this.left+'px';
		bg.append(el);
		this.el = el;
	}
	move(){
		this.left -= 2;
		this.el.style.left = this.left+'px';
		return {top:this.top+25, left:this.left};
	}

	stop(){
		this.delete();
		clearInterval(this.id);	
	}
	delete(){
		if(this.el) {
			this.el.remove();
			this.el = null;	
		}
	}
}