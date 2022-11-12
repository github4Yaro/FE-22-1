import calendarModel from './calendar_model.js';
import calendarView from './calendar_view.js'

export default class calendarController {

	constructor(userID = '1234567890') {
		this.model = new calendarModel(this.handleUpdate);
		this.view = new calendarView();
		this.userID = userID;
	}

	init = () => {
		const month = moment().format('MM');
		this.model.getMonthRecords(month, this.userID);
	};

	handleUpdate = (records) => {
		this.view.renderCalendar(records);
	};

}