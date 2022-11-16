export default class calendarModel {
	
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
        this.url = 'https://yarotbot.tk/'; 
    }
	
	getMonthRecords = (month, year, userID) => {
		const url = `${this.url}getData?month=${month}&year=${year}`;
		fetch(url).then(r=>r.json()).then(d => {
			const records = {
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

	addRecord = (data) => {
		const url = `${this.url}postData`;
		fetch(url, {
		  method: "POST",
		  headers: {'Content-Type': 'application/json'}, 
		  body: JSON.stringify(data)
		}).then(r => r.json()).then(d=>{
		  console.log("Request complete! response:", d);
		});
	};
}