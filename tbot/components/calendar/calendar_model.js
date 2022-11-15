export default class calendarModel {
	apiAction = 'getRecords';
	CLOSED_SLOT = 'closed';
	SELF_SLOT = 'self';
	DEF_SLOTS = {
		'08:00':'open',
		'10:00':'open',
		'12:00':'open',
		'14:00':'open',
		'16:00':'open',
		'18:00':'open'
	};

	constructor(controllerHandleUpdate){
        this.controllerHandleUpdate = controllerHandleUpdate;
        this.url = 'https://yarotbot.tk/getData'; 
    }
	
	getMonthRecords = (month, year, userID) => {
		let url = `${this.url}?month=${month}&year=${year}`;
		fetch(url).then(r=>r.json()).then(d => {
			const records = {
				month:month,
				year:year,
				days:[]
			};
			const daysInMonth = moment().daysInMonth();
			for (let i = 1; i <= daysInMonth; i++){
				let slots = { ...this.DEF_SLOTS}; //move to settings?
				const dayInfo = d.find((d)=> d.day == i);
				if(dayInfo) {
					if(!dayInfo.is_open) {
						slots = null;	
					} else {
						dayInfo.slots.map((slot)=> slots[slot.time] = slot.user == userID?this.SELF_SLOT:this.CLOSED_SLOT)	
					}
				}	
				records.days[i] = slots;
			}
			this.controllerHandleUpdate(records);
		});
	};

	addRecord = ({date, slot, user}) => {};
}