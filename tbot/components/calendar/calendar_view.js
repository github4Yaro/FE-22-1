export default class calendarView {

	calRowsCount = 0;
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
		this.slotSelector = document.getElementById('slotSelectorBody');
		this.slotPopup = new bootstrap.Modal(document.getElementById('slotSelector'), {
		 	keyboard: false
		});
		[this.curDay, this.curMonth, this.curYear] = moment().format('D MM YYYY').split(' ');
		this.createRecordBtn = document.getElementById('createRecord'); 
		this.createRecordBtn.addEventListener('click', () => calendar.createRecord());
	}

	renderCalendar = (records) => {
		
		this.renderBody(records);
		this.renderLegend();
		this.renderMonthSelect();
	}

	renderMonthSelect = () => {

		const [nextMonth, nextYear] = (calendar.month == 12)?[1, +calendar.year+1]:[+calendar.month+1, +calendar.year];
		const [prevMonth, prevYear] = (calendar.month == 1)?[12, calendar.year-1]:[calendar.month-1, +calendar.year];
		
		this.monthSelector.innerHTML = '';

		const prevBtn = document.createElement("div");
		prevBtn.innerText = '<';
		prevBtn.addEventListener('click', () => calendar.selectMonth(prevMonth, prevYear));
		prevBtn.classList = 'col-1 m_btn';
		this.monthSelector.appendChild(prevBtn);

		const monthTitle = document.createElement("div");
		monthTitle.innerText = this.monthNames[+calendar.month];
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

		const momentObj = calendar.selectedMoment;
		const endOfMonth = momentObj.daysInMonth();
		const startOfMonth = +momentObj.startOf('month').format('d');
		this.calRowsCount = 0;
	
		let j = 1;
		let monthHTML = '';

		if(startOfMonth != 1) {
			const endOfPrMonth = momentObj.subtract(1,'month').daysInMonth();
			const diff = (startOfMonth == 0)?5:(startOfMonth-2);
			const startOfPrMonth = endOfPrMonth - diff;
			[monthHTML,j] = this.render(monthHTML, startOfPrMonth, endOfPrMonth, j);
		}
		[monthHTML,j] = this.render(monthHTML, 1, endOfMonth, j, records);
		const endOfWeek = 7 - j + 1;
		if(j != 1) {
			[monthHTML,j] = this.render(monthHTML, 1, endOfWeek, j);
		}
		if(this.calRowsCount == 5) {
			[monthHTML,j] = this.render(monthHTML, endOfWeek+1, endOfWeek+7, j);	
		}
		this.calendarDOM.innerHTML = monthHTML;
		const activeDays = this.calendarDOM.querySelectorAll('.free_slots');
		for (const day of activeDays) {
		  	day.addEventListener('click', (el)=>{ calendar.selectDay(el.target.dataset.day)});
		}
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
				this.calRowsCount++;
			}
			j++;
		}
		return [html, j];
	}

	renderSlots = (slots) => {
		
		let slotsHTML = ''
		let i = 0;
		
		for (const time in slots) {
			const disabled = (slots[time] == 'open')? '' : 'disabled';
			const cls = (slots[time] == 'self')?'btn-warning':'btn-info';
			slotsHTML += `<input type="radio" class="btn-check" name="slot" id="slot_${time}" data-slot="${time}" autocomplete="off" ${disabled}>
				<label class="btn ${cls} btn-sm m-2" for="slot_${time}">${time}</label>`;
			if (i == 2) {
				slotsHTML += `<br/>`;	
			}
			i++;
		}
		this.slotSelector.innerHTML = slotsHTML;
		const activeSlots = this.slotSelector.querySelectorAll('input:not([disabled])');

		for (const slot of activeSlots) {
		  	slot.addEventListener('click', (el)=>calendar.selectSlot(el.target.dataset.slot));
		}
		this.slotPopup.show();
	}
	
	#getClass = (records, i) => {

		let checkDay = false;
		let cls = 'inactive';
		let self = false;

		const is_past = (calendar.year < this.curYear)?true:(calendar.year == this.curYear && calendar.month < this.curMonth);

		if(records.days != undefined) {

			if(calendar.month == this.curMonth && calendar.year == this.curYear) {
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

	renderDay = (day, cls) => `<td><span class="${cls}" data-day="${day}">${day}</span></td>`;

}