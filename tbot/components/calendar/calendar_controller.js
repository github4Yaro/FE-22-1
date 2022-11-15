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
		this.model.getMonthRecords(month, year, this.userID);
	};

	selectMonth = (month, year) => {this.model.getMonthRecords(month, year, this.userID)};

	handleUpdate = (records) => {
		this.view.renderCalendar(records);
	};

}