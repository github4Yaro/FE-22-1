import calendarModel from './calendar_model.js';
import calendarView from './calendar_view.js'

export default class calendarController {

	constructor(userID) {
		this.model = new calendarModel(this.handleUpdate);
		this.view = new calendarView();
		this.userID = userID;
	}

	init = () => {
		const month = moment().format('MM');
		const year =  moment().format('YYYY');
		this.selectMonth(month, year);
	};

	selectMonth = (month, year) => {
		const selMonth = '0' + month;
		const selYear  = year;

		this.month = selMonth.slice(-2);
		this.year  = selYear;

		this.selectedMoment = moment(`${this.year}-${this.month}`);
		this.model.getMonthRecords(month, year, this.userID);
	};

	selectDay = (day) => {
		if(this.records.days[day] != undefined){
			this.day = day;
			this.view.renderSlots(this.records.days[day]);
		}
	}

	selectSlot = (slot) => {
		this.slot = slot;
	}

	createRecord = () => {
		const data = {
			year:this.year,
			month:this.month,
			day:this.day,
			slot:this.slot,
			user:this.userID
		}
		this.model.addRecord(data);
	}

	handleUpdate = (records) => {
		this.records = records;
		this.view.renderCalendar(records);
	};

}