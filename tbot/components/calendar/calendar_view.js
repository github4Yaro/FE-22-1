export default class calendarView {

	legend = [
		{cls:'inactive',title:'нема запису'},
		{cls:'day_off',title:'вихiдний'},
		{cls:'active',title:'робочий, э час'},
		{cls:'active no_slots',title:'робочий, часy нема'},
		{cls:'self',title:'робочий Ваш запис'}	
	];

	monthNames = {
		1:'Січень',
		2:'Лютий',
		3:'Березень',
		4:'Квітень',
		5:'Травень',
		6:'Червень',
		7:'Липень',
		8:'Серпень',
		9:'Вересень',
		10:'Жовтень',
		11:'Листопад',
		12:'Грудень',
	}
	
	constructor() {
		this.calendarDOM = document.getElementById('calDays');
		this.legendDom = document.getElementById('calLegend');
		this.monthSelector = document.getElementById('monthSelector');
		[this.curDay, this.curMonth, this.curYear] = moment().format('D MM YYYY').split(' ');
	}

	renderCalendar = (records) => {
		
		this.renderBody(records);
		this.renderLegend();
		this.renderMonthSelect(records.month, records.year);
	}

	renderMonthSelect = (selectedMonth, selectedYear) => {

		const [nextMonth, nextYear] = (selectedMonth == 12)?[1, +selectedYear+1]:[+selectedMonth+1, +selectedYear];
		const [prevMonth, prevYear] = (selectedMonth == 1)?[12, selectedYear-1]:[selectedMonth-1, +selectedYear];
		
		this.monthSelector.innerHTML = '';

		const prevBtn = document.createElement("div");
		prevBtn.innerText = '<';
		prevBtn.addEventListener('click', () => calendar.selectMonth(prevMonth, prevYear));
		prevBtn.classList = 'col-1 m_btn';
		this.monthSelector.appendChild(prevBtn);

		const monthTitle = document.createElement("div");
		monthTitle.innerText = this.monthNames[+selectedMonth];
		monthTitle.classList = 'w-50 text-center';
		this.monthSelector.appendChild(monthTitle);

		const nextBtn = document.createElement("div");
		nextBtn.innerText = '>';
		nextBtn.addEventListener('click', () => calendar.selectMonth(nextMonth, nextYear));
		nextBtn.classList = 'col-1 m_btn';
		this.monthSelector.appendChild(nextBtn);
	}


	renderLegend = () => {
		const legendHTML = this.legend.reduce((ac, r)=> `${ac}<tr>${this.renderDay('',r.cls)}${this.renderDay(r.title,'legend')}<tr>`,'');
		this.legendDom.innerHTML = legendHTML;
	}

	renderBody = (records)=>{
		const rMonth = '0'+records.month;
		const momentObj = moment(`${records.year}-${rMonth.slice(-2)}`);
		const endOfMonth = momentObj.daysInMonth();
		const startOfMonth = +momentObj.startOf('month').format('d');
	
		let j = 1;
		let monthHTML = '';
		if(startOfMonth != 1) {
			const endOfPrMonth = momentObj.subtract(1,'month').daysInMonth();
			const diff = (startOfMonth == 0)?5:(startOfMonth-2);
			const startOfPrMonth = endOfPrMonth - diff;
			[monthHTML,j] = this.render(monthHTML, startOfPrMonth, endOfPrMonth, j);
		}
		[monthHTML,j] = this.render(monthHTML, 1, endOfMonth, j, records);
		if(j != 1) {
			const endOfWeek = 7 - j + 1;
			[monthHTML,j] = this.render(monthHTML, 1, endOfWeek, j);
		}
		this.calendarDOM.innerHTML = monthHTML;
	}

	render = (html, start, end, j, records = {}) => {
		
		for(let i = start; i <= end; i++) {
			if(j == 1){
				html+='<tr>';
			}
			const cls = this.#getClass(records, i); 
			
			html+=this.renderDay(i, cls);
			if(j == 7){
				html+='</tr>';
				j = 0;
			}
			j++;
		}
		return [html, j];
	}
	
	#getClass = (records, i) => {

		let checkDay = false;
		let cls = 'inactive';
		let self = false;

		const is_past = (records.year < this.curYear)?true:(records.year == this.curYear && records.month < this.curMonth);

		if(records.days != undefined) {

			if(records.month == this.curMonth && records.year == this.curYear) {
				checkDay = true;	
			}

			if(!records.days[i]) {
				cls += ' day_off';
			}else{
				if(!is_past && (!checkDay || i >= this.curDay)) {
					cls = 'active';
					const free_slots = [];
					for (const [key, value] of Object.entries(records.days[i])) {
						if(value == 'self') {
							self = true;
						} else if(value == 'open') {
							free_slots.push(key);
						} 
					}
					if(free_slots.length > 0) {
						cls += ' free_slots';
					} else {
						cls += ' no_slots'
					}
				}
			}
			if(self) {
				cls += ' self';
			}
		}
		return cls;
	}

	renderDay = (day, cls) => `<td><span class="${cls}">${day}</span></td>`;

}