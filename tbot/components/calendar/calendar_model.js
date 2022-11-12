export default class calendarModel {
	apiAction = 'getRecords';
	CLOSED_SLOT = 'closed';
	SELF_SLOT = 'self';

	constructor(controllerHandleUpdate){
        this.controllerHandleUpdate = controllerHandleUpdate;
        this.url = './data.json'; 
    }
	
	getMonthRecords = (month, userID) => {
		fetch(this.url).then(r=>r.json()).then(d => {
			const records = []
			d.map((dayInfo) => {
				const day = dayInfo.day;
				const slots = dayInfo.slots.reduce((ac, d) => {
					ac.push({ [d.time] :(d.user == userID?this.SELF_SLOT:this.CLOSED_SLOT)})
					return ac;
				},[]);
				records.push({[day]:slots});
			});
			this.controllerHandleUpdate(records);
		});
	};
	addRecord = ({date, slot, user}) => {};
}