


const BDate = document.getElementById('b_date');
const nameInp = document.getElementById('name');
const targetArea = document.getElementById('area');
const startGen = document.getElementById('startGen');


startGen.addEventListener('click', () => {
	if(BDate.value && nameInp.value){
		const size = _calculateAge(BDate.value)*10;
		const html = getHTMLElement(size, nameInp.value);
	    targetArea.insertAdjacentHTML('beforeend', html);
	}
});

function _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - new Date(birthday);
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}


function getHTMLElement(size, name){
    return `<div style="width: ${size}px; height: ${ size }px">${ name }<span style="font-size:${size}px">person</span></div>`;
}