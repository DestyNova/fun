const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const tempoInput = document.getElementById("tempoInput");
const everySelect = document.getElementById("everySelect");
const startStopButton = document.getElementById("startStopButton");
const minTempo = 20;
const maxTempo = 320;

let isPlaying = false;
let timerId;
let counter = 0;
let tempo = parseInt(tempoInput.value);
let every = parseInt(everySelect.value);

function playClick() {
	let oscillator = audioCtx.createOscillator();
	let gainNode = audioCtx.createGain();
	oscillator.connect(gainNode);
	gainNode.connect(audioCtx.destination);
	oscillator.type = "triangle";
	gainNode.gain.value = 0.1;
	oscillator.start();
	gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
	oscillator.stop(audioCtx.currentTime + 0.05);
}

function startStop() {
	if (!isPlaying) {
		startMetronome();
	} else {
		stopMetronome();
	}
}

function startMetronome() {
	isPlaying = true;
	tempo = parseInt(tempoInput.value);
	if(isNaN(tempo)) {
		tempo = 120;
		tempoInput.value = "120";
	} else if (tempo > maxTempo) {
		tempo = maxTempo;
		tempoInput.value = maxTempo.toString();
	} else if (tempo < minTempo) {
		tempo = minTempo;
		tempoInput.value = minTempo.toString();
	}

	console.log(`tempo is ${tempo}`);
	every = parseInt(everySelect.value);
	startStopButton.innerText = "Stop";
	timerId = setInterval(function() {
		counter++;
		if (counter % every === 0) {
			playClick();
			counter = 0;
		}
	}, 60000 / tempo);
}

function stopMetronome() {
	isPlaying = false;
	startStopButton.innerText = "Start";
	clearInterval(timerId);
	counter = 0;
}

startStopButton.addEventListener("click", startStop);
