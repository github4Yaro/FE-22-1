class Game{
	playgraund = document.querySelector('.game-container .tile-container');
	newGameBtn = document.querySelector('.game-container .retry-button');
	message = document.querySelector('.game-message p');
	solved = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	empty = 15;
	moves = 0;
	mixed_blocks = [];
	
	constructor() {
		this.newGameBtn.addEventListener('click',()=>this.startGame());
		this.startGame();
		
	};
	startGame() {

		this.message.parentElement.classList.remove("game-won");
		this.playgraund.innerHTML = '';

		this.mixed_blocks = [...this.solved];
		this.shuffle();
		this.print();
		this.moves = 0;
		

		const tiles = document.getElementsByClassName('tile');
		for (let i=0; i<tiles.length; i++) {
			tiles[i].addEventListener('click', (el) => this.move(tiles[i]));
		}
	}

	endGame() {
		const message_text = `You win in ${this.moves} moves`;
		this.message.innerText = message_text;
		this.message.parentElement.classList.add("game-won");
	}

	testSolution() {
		let test = [...this.mixed_blocks];
		test.pop();
		return JSON.stringify(this.solved) === JSON.stringify(test);
	}

	shuffle() {
		let currentIndex = this.solved.length,  randomIndex;

	  	while (currentIndex != 0) {

		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex--;

		    [this.mixed_blocks[currentIndex], this.mixed_blocks[randomIndex]] = [
		      this.mixed_blocks[randomIndex], this.mixed_blocks[currentIndex]];
	  	}
	  	
	  	if(!this.solvable()) {
	  		const t = this.mixed_blocks[0];
	  		this.mixed_blocks[0] = this.mixed_blocks[1];
	  		this.mixed_blocks[1] = t;
	  	}
	  	this.mixed_blocks[15] = 0;
	}

	solvable() {
      for (var kDisorder = 0, i = 1, len = this.mixed_blocks.length; i < len; i++)
        for (var j = i-1; j >= 0; j--) if (this.mixed_blocks[j] > this.mixed_blocks[i]) kDisorder++;
      return !(kDisorder % 2);  
	};

	print(){
		for(let index = 0; index < 15; index++) {
			const i = Math.floor(index/4);
			const j = index - i * 4;

			const el = document.createElement("div");
			const num = this.mixed_blocks[index];
			el.className = `tile tile-position-${i+1}-${j+1}`;
			el.dataset.pos = index;
			if(num != 0) {
				const inner_el = document.createElement("div");
				inner_el.className = "tile-inner";
				inner_el.innerText = num;
				el.append(inner_el);
			}
			this.playgraund.append(el);	
		}
	};
	move(el){
		let pos = el.dataset.pos;
		const diff = Math.abs(pos - this.empty);

		if(diff == 4 || diff == 1) {
			this.moves++;
			this.mixed_blocks[pos] = 0;
			pos = this.empty;
			this.empty = el.dataset.pos
			el.dataset.pos = pos
			this.mixed_blocks[pos] = +el.innerText;
			const i = Math.floor(pos/4);
			const j = pos - i * 4;
			el.className = `tile tile-position-${i+1}-${j+1}`;
		}
		
		if(this.testSolution()){
			this.endGame();
		}
		
	};
}

const game = new Game();