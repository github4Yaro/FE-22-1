const DNA_pairs = {'A':'T','T':'A','C':'G','G':'C'};


function Product(name, price, img){
    this.name = name;
    this.price = price;
    this.img = img;
}

function ProductInBasket(product) {
    this.ID = product.name;
    this.amount = 0;
    this.count = 0;
    this.product = product;

    this.add = function(count){
        this.count += count;
        this.amount += product.price * count;
    }
}

const banana = new Product('banana', 10, 'banana.png');
const lemon = new Product('lemon', 11, 'lemon.png');
const laptop = new Product('laptop', 33, 'laptop.png');
const phone = new Product('phone', 21, 'phone.png');
const car = new Product('car', 40, 'car.png');


let basket = {
    products:[],

    get count(){
        let count = 0;
        this.products.forEach(pib => count+=pib.count)
        return count;    
    },

    get amount(){
        let amount = 0;
        this.products.forEach(pib => amount+=pib.amount)
        return amount;    
    },

    get avg(){
        let avg = this.amount / this.count;
        return avg.toFixed(2);
    },

    get max(){
        let max = 0;
        this.products.forEach(pib => (pib.product.price > max)? max = pib.product.price: false)
        return max;
    },
    add(product, count){
        if(count < 0 ){
            return false;
        }
        const isProduct = product instanceof Product;
        if(!isProduct) {
            console.error('the product has to be an instance of the Product');
            return false;
        }

        let productInBasket = this.products.find(pib=>pib.ID == product.name);
        if(productInBasket == undefined) {
            productInBasket = new ProductInBasket(product); 
            this.products.push(productInBasket);
        }
        productInBasket.add(count);
        
        return this;
    },
    remove(product) {
        const isProduct = product instanceof Product;
        if(!isProduct) {
            console.error('the product has to be an instance of the Product');
            return false;
        }
        this.products = this.products.filter(pib=> pib.ID != product.name);    
    }
};

let checkout = {
    printProducts(){
        let ret='';
        let i = 0;
        basket.products.forEach(pib => ret = `${ret}<div class="row">
            <div>${++i}</div>
            <div>${pib.product.name}</div>
            <div>${pib.product.price}</div>
            <div>${pib.count}</div>
            <div>${pib.amount}</div>
            <div><button data-id="${pib.ID}" onclick="checkout.remove(this)">Remove</button></div>
            </div>`);
        ret = `${ret} <hr/> 
            <div class="row">
                <div><strong>Summary:</strong> </div>
                <div>Amount</div>
                <div>Max price</div>
                <div>Avg price</div> 
            </div>
            <div class="row">
                <div> </div>
                <div>${basket.amount}</div>
                <div>${basket.max}</div>
                <div>${basket.avg}</div>
            </div>
            `;
        document.getElementById('shippingBasket').innerHTML = ret;
        
    },
    decrease(el) {
        let input = el.closest('.row').querySelector('input');
        if(input.value == 0) {
            console.warn('The count could be less than 0');
            return false;
        }
        input.value --;
    },
    increase(el) {
        let input = el.closest('.row').querySelector('input');
        input.value ++;
    },
    add(el) {
        const count = +el.closest('.row').querySelector('input').value;
        const type = el.dataset.type;
        if( count <= 0) {
            console.warn('The count has to be more than 0'); 
            return false;  
        }
        
        basket.add(eval(type),count);
        el.closest('.row').querySelector('input').value = 0;
        this.printProducts();

    },
    remove(el) {
        let productId = el.dataset.id;
        basket.remove(eval(productId)); 
        this.printProducts();
    }
}


function DNA_strand(DNA) {
    if(DNA.length == 0) {
        return false;
    }
    let ret = '';
    for (let i=0; i < DNA.length; i++) {
        if(DNA_pairs[DNA[i]] != undefined) {
            ret = `${ret}${DNA_pairs[DNA[i]]}`;
        } else {
            ret = `${ret} `;
        }
    }
    return ret; 
}

function get_length(str) {
    
    let min = 99;
    let words = str.split(' ');

    words.forEach( word => (word.length < min)? min = word.length: false); 
    return min;
}

function word_sort(str) {
    let words = str.split(' ');
    let ret = [];
    words.forEach(function(word){
        
        let num = word.match(/\d+/gm);
        ret[num[0]] = word
        
    });
    return ret.join(' ');
}

function DNA() {
    
    const inputDNA = document.getElementById('DNAString').value;
    const anw = `result for ${inputDNA} is ${DNA_strand(inputDNA)}`;
    setAnswer(anw, 'DNA');
    return false;
}

function shortestWord() {

    const inputStr = document.getElementById('str').value; 
    const anw = `The shortest word has length "${get_length(inputStr)}"`;
    setAnswer(anw, 'shortestWord');
    return false;
}

function sentsSort() {
    const inputStr = document.getElementById('strForSort').value;
    const anw = word_sort(inputStr);
    setAnswer(anw, 'sentsSort');
    return false;
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
	document.body.querySelector("#"+tabName+" .text").innerHTML = answer;
	document.body.querySelector("#"+tabName+" .answer").style.display = "block";
}

function resetTab(tabName) {
	document.body.querySelector("#"+tabName+" .form").style.display = "block";
	let inputs = document.body.querySelectorAll("#"+tabName+" input");
	inputs.forEach(input => (input.type != 'submit')?input.value = "":'');
	document.body.querySelector("#"+tabName+" .answer").style.display = "none";
}