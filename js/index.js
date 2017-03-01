
(function IIFE () {
	let timeHour = document.getElementById('time-hour')
	let timeMinutes = document.getElementById('time-minutes')
	let timeSeconds = document.getElementById('time-seconds')
	let ballHour = document.getElementById('ball-hour')
	let ballFiveMinutes = document.getElementById('ball-fives')
	let ballOneMinutes = document.getElementById('ball-ones')

	let currentDate = new Date()
	let currentHour = currentDate.getHours()
	let currentMinutes = currentDate.getMinutes()
	let currentSeconds = currentDate.getSeconds()
	let hoursBallHolder = new Array(currentHour).fill(1)
	let fiveMinutesBallHolder = new Array(Math.floor(currentMinutes / 5)).fill(1)
	let oneMinutesBallHolder = new Array(currentMinutes % 5).fill(1)
	let seconds = currentSeconds


	function addSecond () {
		seconds += 1
		if (seconds === 60) {
			seconds = 0
			return true
		}
		return false
	}

	function updateOneMinBH (addBall) {
		if (addBall) {
			oneMinutesBallHolder.push(1)
			if (oneMinutesBallHolder.length >= 5) {
				clearBallHolder(oneMinutesBallHolder, false)
				return true
			}
		}
		return false
	}

	function updateFiveMinBH (addBall) {
		if (addBall) {
			fiveMinutesBallHolder.push(1)
			if (fiveMinutesBallHolder.length >= 12) {
				clearBallHolder(fiveMinutesBallHolder, false)
				return true
			}
		}
		return false
	}

	function updateHourBH (addBall) {
		if (addBall) {
			hoursBallHolder.push(1)
			if (hoursBallHolder.length >= 24) {
				clearBallHolder(hoursBallHolder, true)
			}
		}
	}

	function clearBallHolder (ballHolder, isHourBH) {
		isHourBH ? ballHolder.length = 1 : ballHolder.length = 0
	}

	setInterval(function () {
		let displayHours = hoursBallHolder.length
		let displayFiveMinutes = fiveMinutesBallHolder.length
		let displayOneMinutes = oneMinutesBallHolder.length

		updateHourBH(updateFiveMinBH(updateOneMinBH(addSecond())))

		timeHour.innerHTML = displayHours < 10 ? '0' + displayHours.toString() : displayHours.toString()
		timeMinutes.innerHTML = (displayFiveMinutes * 5) < 10
			?
				'0' + (displayOneMinutes + (displayFiveMinutes * 5)).toString()
			:
				((displayFiveMinutes * 5) + displayOneMinutes).toString()
		timeSeconds.innerHTML = seconds < 10 ? '0' + seconds.toString() : seconds.toString()

		ballHour.innerHTML = displayHours.toString()
		ballFiveMinutes.innerHTML = displayFiveMinutes.toString()
		ballOneMinutes.innerHTML = displayOneMinutes.toString()

		console.log(displayFiveMinutes, displayOneMinutes)
	}, 1000)

}())