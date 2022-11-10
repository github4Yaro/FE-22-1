
	Telegram.WebApp.ready();

    const initData = Telegram.WebApp.initData || '';
    const initDataUnsafe = Telegram.WebApp.initDataUnsafe || {};

	Telegram.WebApp.MainButton
        .setText('CLOSE WEBVIEW')
        .show()
        .onClick(function(){ webviewClose(); });

	function webviewClose() {
        Telegram.WebApp.close();
    }