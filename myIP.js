const IPlink = '//ip-api.com/json/';
const GAPI = '//www.7timer.info/bin/astro.php?ac=0&lang=en&unit=metric&output=internal&tzshift=0';

	fetch(IPlink).then(r => r.json()).then( data => {
		const IPaddr = document.getElementById('ipAddr');
		const country = document.getElementById('country');
		const region = document.getElementById('region');
		const city = document.getElementById('city');
		const GeoImg = document.getElementById('GeoImg');

		IPaddr.innerText = data.query;
		country.innerText = data.country;
		region.innerText = data.regionName;
		city.innerText = data.city;
		link = `${GAPI}&lon=${data.lon}&lat=${data.lan}`;
		GeoImg.src = link;
	});
