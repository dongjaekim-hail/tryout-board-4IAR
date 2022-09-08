// function finish_experiment() {
// 	save(data_log, "fourinarow_data_" + user_credentials + ".json");
// 	document.body.innerHTML = '<p> <center> Please wait. You will be redirected to the next task in 10 seconds.  </center> </p>'
// 	setTimeout(function () { location.href = task_combo / twostep.html }, 10000)
// 	window.open("../twostep.html", '_self');
// }
function finish_experiment() {
	save(data_log, "fourinarow_data_" + user_credentials + ".json");
	save(data_log_tryout, "fourinarow_tryout_data_" + user_credentials + ".json");
	document.body.innerHTML = '<p> <center> Please wait. You will be redirected to the next task in 10 seconds.  </center> </p>'
	setTimeout(function () { location.href = task_combo / twostep.html }, 10000)
	// window.open("../twostep.html", '_self');
	window.open("https://prolific.co", '_self');
}

function get_image_path(filename) {
	return "../static/images/" + filename;
}

function save(data, filename) {
	var blob = new Blob([JSON.stringify(data)], { type: 'text/csv' });
	var elem = window.document.createElement('a');
	elem.href = window.URL.createObjectURL(blob);
	elem.download = filename;
	document.body.appendChild(elem);
	elem.click();
	document.body.removeChild(elem);
}

function log_data(data) {
	data["event_time"] = Date.now()
	data["credentials"] = user_credentials
	console.log(data)
	data_log.push(data)
}

function log_data_tryout(data) {
	data["event_time"] = Date.now()
	data["credentials"] = user_credentials
	console.log(data)
	data_log_tryout.push(data)
}

function toggleFullScreen() {
	if ((document.fullScreenElement && document.fullScreenElement !== null) ||
		(!document.mozFullScreen && !document.webkitIsFullScreen)) {
		if (document.documentElement.requestFullScreen) {
			document.documentElement.requestFullScreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullScreen) {
			document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}
}

// function launchFullScreen(element) {
// 	if(element.requestFullScreen) {
// 	  element.requestFullScreen();
// 	} else if(element.mozRequestFullScreen) {
// 	  element.mozRequestFullScreen();
// 	} else if(element.webkitRequestFullScreen) {
// 	  element.webkitRequestFullScreen();
// 	}
//   }

//   // Launch fullscreen for browsers that support it!
//   launchFullScreen(document.documentElement); // the whole page
//   launchFullScreen(document.getElementById("videoElement")); // any individual element
// document.documentElement.requestFullscreen();

$(document).ready(function () {
	// launchFullScreen
	enter_credentials(start_game)
	// fullscreen: true,
	user_credentials = enter_credentials
	initialize_task(20); //change trial number here
	start_experiment();
	// next_task();
});

// var fourinarow_experiment = [];
// fourinarow_experiment.push(enter_credentials)
// user_credentials = enter_credentials
// fourinarow_experiment.push(initialize_task(2))
// fourinarow_experiment.push(start_experiment)
// // fourinarow_experiment.push(next_task)
