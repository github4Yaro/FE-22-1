	const userInfo = document.getElementById('user_info');

	Telegram.WebApp.ready();

    const initData = Telegram.WebApp.initData || '';
    const initDataUnsafe = Telegram.WebApp.initDataUnsafe || {};

    const userInfoLabel = document.getElementById('user_info');
    userInfoLabel.innerText = `${JSON.stringify(initData.user)}`

	Telegram.WebApp.MainButton
        .setText('Закрыть окно')
        .show()
        .onClick(function(){ webviewClose(); });

	function webviewClose() {
        Telegram.WebApp.close();
    }
