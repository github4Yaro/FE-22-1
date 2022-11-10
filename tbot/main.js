	
	const debug = document.getElementById('debug');

	Telegram.WebApp.ready();

    const initData = Telegram.WebApp.initData || '';
    const initDataUnsafe = Telegram.WebApp.initDataUnsafe || {};

    const userInfoLabel = document.getElementById('user_info');
    userInfoLabel.innerText = initDataUnsafe.user.first_name;

    
    //check if record exist

    debug.innerText = JSON.stringify(initDataUnsafe.user.first_name);
    

	Telegram.WebApp.MainButton
        .setText('Закрыть окно')
        .show()
        .onClick(function(){ webviewClose(); });

	function webviewClose() {
        Telegram.WebApp.close();
    }
