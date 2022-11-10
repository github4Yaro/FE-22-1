	const userInfo = document.getElementById('user_info');
	const debug = document.getElementById('debug');

	Telegram.WebApp.ready();

    const initData = Telegram.WebApp.initData || '';
    const initDataUnsafe = Telegram.WebApp.initDataUnsafe || {};

    const userInfoLabel = document.getElementById('user_info');
    userInfoLabel.innerText = JSON.stringify(initDataUnsafe.user);

    
    //check if record exist

    

	Telegram.WebApp.MainButton
        .setText('Закрыть окно')
        .show()
        .onClick(function(){ webviewClose(); });

	function webviewClose() {
        Telegram.WebApp.close();
    }
