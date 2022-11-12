export default class calendarView {
	
	constructor() {
		this.calendarDOM = document.getElementById('calDays');	
	}

	renderCalendar = (records) => {
		let calendar = '';
		const month = moment().format('MMM');
		const endOfMonth = moment().daysInMonth();
		const startOfMonth = +moment().startOf('month').format('d');
		let j = 1;
		let monthHTML = '';
		if(startOfMonth != 1) {
			const endOfPrMonth = moment().subtract(1,'month').daysInMonth();
			const diff = (startOfMonth == 0)?6:(startOfMonth-2);
			const startOfPrMonth = endOfPrMonth - diff;
			[monthHTML,j] = this.render(monthHTML, startOfPrMonth, endOfPrMonth, j);
		}
		[monthHTML,j] = this.render(monthHTML, 1, endOfMonth, j);
		this.calendarDOM.innerHTML = monthHTML
	}

	render = (html, start, end, j) => {
		for(let i = start; i <= end; i++) {
			if(j == 1){
				html+='<tr>';
			}
			html+=this.renderDay(i, '');
			if(j == 7){
				html+='</tr>';
				j = 0;
			}
			j++;
		}
		return [html, j];
	}
	

	renderDay = (day, cls) => `<td><span class="${cls}">${day}</span></td>`;

}