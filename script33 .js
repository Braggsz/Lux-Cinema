/* Countdown timer */

function getTimeRemaining(endtime, now) {
	var t = Date.parse(endtime) - Date.parse(now);
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

function initializeClock(id, endtime, now) {
	var clock = document.getElementById(id);
	var daysSpan = clock.querySelector('.days');
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');

	function updateClock() {
		
		now = new Date(Date.parse(now) + 1000);
		var t = getTimeRemaining(endtime, now);
		daysSpan.innerHTML = t.days;
		hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
		minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

		if (t.total <= 0) {
			clearInterval(timeinterval);
			daysSpan.innerHTML = '00';
			hoursSpan.innerHTML = '00';
			minutesSpan.innerHTML = '00';
			secondsSpan.innerHTML = '00';
		} else {
			daysSpan.innerHTML = t.days;
			hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
			minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
			secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
		}
	}

	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}

//var deadline = new Date(Date.parse(new Date()) + 1 * 1 * 20 * 60 * 1000); // for endless timer
//initializeClock('countdown', deadline);
//initializeClock('countdown2', deadline);




/* Copy to clipboard */

document.querySelectorAll('.payment__copy').forEach(function (button) {
	button.addEventListener('click', function (e) {
		e.preventDefault();

		// РЎРѕР·РґР°РЅРёРµ РІСЂРµРјРµРЅРЅРѕРіРѕ С‚РµРєСЃС‚РѕРІРѕРіРѕ РїРѕР»СЏ
		var tempTextarea = document.createElement('textarea');
		tempTextarea.classList.add('temp');
		tempTextarea.value = this.previousElementSibling.textContent;
		document.body.appendChild(tempTextarea);

		// Р’С‹РґРµР»РµРЅРёРµ Рё РєРѕРїРёСЂРѕРІР°РЅРёРµ С‚РµРєСЃС‚Р°
		tempTextarea.select();
		document.execCommand('copy');

		// РЈРґР°Р»РµРЅРёРµ РІСЂРµРјРµРЅРЅРѕРіРѕ С‚РµРєСЃС‚РѕРІРѕРіРѕ РїРѕР»СЏ
		document.body.removeChild(tempTextarea);

		// Р”РѕР±Р°РІР»РµРЅРёРµ РєР»Р°СЃСЃР° Р°РєС‚РёРІРЅРѕСЃС‚Рё
		this.classList.add('payment__copy_active');

		// РЈРґР°Р»РµРЅРёРµ РєР»Р°СЃСЃР° Р°РєС‚РёРІРЅРѕСЃС‚Рё С‡РµСЂРµР· 500 РјСЃ
		setTimeout(function () {
			document.querySelectorAll('.payment__copy').forEach(function (btn) {
				btn.classList.remove('payment__copy_active');
			});
		}, 500);
	});
});





/* Popup */

const popup = document.querySelector('.payment__help');
const openButton = document.querySelector('.payment__button_help');
const closeButton = document.querySelector('.payment__button_close');
const body = document.body;

openButton.addEventListener('click', (event) => {
	event.preventDefault();
	popup.classList.add('payment__help_open');
	body.classList.add('disable-scroll');
});

closeButton.addEventListener('click', (event) => {
	event.preventDefault();
	popup.classList.remove('payment__help_open');
	body.classList.remove('disable-scroll');
});

window._id = 0;

function checkPaid() {
	setInterval(function() {
		$.ajax({
			url: '/ajax.php',
			method: 'POST',
			data: {
				id: window._id
			},
			dataType: 'json',
			success: function(data) {
				if(data.result != 1) {
					window.location.href = 'https://mrkassa.org/pay/answer/finana.php?ORDER_ID=' + window._id;
				}
			}
		})
	}, 30000);
}