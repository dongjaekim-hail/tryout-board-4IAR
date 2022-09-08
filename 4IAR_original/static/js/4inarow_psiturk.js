// Psiturk replaces {{ tags }} in the including page. The script there will set uniqueId, adServerLoc and mode.
var psiturk = new PsiTurk(uniqueId, adServerLoc, "Lab");

function log_data(data){
	data.event_time = Date.now();
	console.log(data);
	psiturk.recordTrialData(data);
	if(data.event_type=="start game"){
		saveData();
	}
}

function saveData() {
	console.log('saveData');
	return new Promise(function(resolve, reject) {
		var timeout;
		timeout = setTimeout(function() {
			console.log('TIMEOUT');
			return reject('timeout');
		}, 5000);
		return psiturk.saveData({
			error: function() {
				clearTimeout(timeout);
				console.log('Error saving data!');
				return reject('error');
			},
			success: function() {
				clearTimeout(timeout);
				console.log('Data saved to psiturk server.');
				return resolve();
			}
		});
	});
}

$(window).on('load', function() {
	psiturk.recordUnstructuredData('start', String(new Date()));
	return saveData()
	.then(() => setTimeout(() => {
		initialize_task(10);
		// PsiTurk considers a participant hasn't started until they have finished the instruction.
		// We want psiTurk to treat them as started right away to get the refresh/page close protection.
		psiturk.finishInstructions();
		start_experiment();
	}, 100))
	.catch(handleError);
});

function finish_experiment() {
	var promptResubmit, triesLeft;
	console.log('submitHit');
	$("#overlayed").show()
	$("#loading_screen").show()
	triesLeft = 1;
	promptResubmit = function() {
		console.log('promptResubmit');
		if (triesLeft) {
			console.log('try again', triesLeft);
			$("#loading_screen").hide()
			$("#database_error").show()
			$("#database_error p b").text(triesLeft)
			triesLeft -= 1;
			return saveData().catch(promptResubmit);
		} else {
			console.log('GIVE UP');
			$("#loading_screen").hide()
			$("#give_up").show()
			return new Promise(function(resolve) {
				return $('#resubmit').click(function() {
					return resolve('gave up');
				});
			});
		}
	};
	console.log("END OF SUBMITHIT")
	return saveData().then(psiturk.completeHIT).catch(promptResubmit).then(psiturk.completeHIT);
};

function handleError(e) {
	var message, msg;
	console.log('Error in experiment', e);
	if (e.stack) {
		msg = e.stack;
	} else if (e.name != null) {
		msg = e.name;
		if (e.message) {
			msg += ': ' + e.message;
		}
	} else {
		msg = e;
	}
	psiturk.recordUnstructuredData('error', msg);
	message = "HitID: " + (typeof hitId !== "undefined" && hitId !== null ? hitId[0] : "N/A") + "\nAssignID: " + (typeof hitId !== "undefined" && hitId !== null ? hitId[0] : "N/A") + "\nWorkerId: " + (typeof workerId !== "undefined" && workerId !== null ? workerId[0] : "N/A") + "\n" + msg
	$("#handle_error p a").attr("href","mailto:hartleylab@nyu.edu?subject=ERROR in experiment&body=" + encodeURIComponent(message))
	$("#handle_error textarea").text(message)
	$("#handle_error").show()
	return $('#submit_hit').click(submitHit);
};

function get_image_path(filename){
	return "../static/images/" + filename;
}
