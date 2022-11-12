import calendarController from './calendar/calendar_controller.js'
export default class webApp {

	debug = document.getElementById('debug');
	singUpBtn = document.getElementById('sing_up');
	nextVisitDate = document.getElementById('next_visit');
	userInfoLabel = document.getElementById('user_info');

	constructor() {
		Telegram.WebApp.ready();

		this.initData = Telegram.WebApp.initData || '';
    	this.initDataUnsafe = Telegram.WebApp.initDataUnsafe || {};	
    	this.user = this.initDataUnsafe.user || {};

    	this.userInfoLabel.innerText = (this.user)?this.user.first_name:'';


    	const calendar = new calendarController(this.user.id || 1234567890);
		calendar.init();

    	Telegram.WebApp.MainButton
	        .setText('Закрыть окно')
	        .show()
	        .onClick(function(){ this.webviewClose});
	}

	webviewClose = () => Telegram.WebApp.close();
}