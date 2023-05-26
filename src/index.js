require("./style.css");
import bashEmulator from "bash-emulator";
import { echo, help } from "./commands.js";
import {
	insertTilde,
	replaceTilde,
	updateScroll,
	log,
	error,
} from "./functions.js";
window.io = {
	log: log,
	error: error,
};

var input = document.getElementById("input");
var output = document.getElementById("output");
var prompt = document.getElementById("prompt");

let USERNAME = "guest";
let HOSTNAME = window.location.hostname;

window.USERNAME = USERNAME;
window.HOSTNAME = HOSTNAME;

import { defaultState, welcomeMessage } from "./default.js";
log(welcomeMessage);

var state = JSON.parse(
	localStorage.bashEmulator || JSON.stringify(defaultState)
);
var emulator = bashEmulator(state);

window.emulator = emulator;

function saveState() {
	localStorage.bashEmulator = JSON.stringify(emulator.state);
}

emulator.commands.clear = function (env) {
	output.innerHTML = "";
	env.exit();
};
emulator.commands.save = (env) => {
	saveState();
	log("State saved");
	env.exit();
};
emulator.commands.echo = echo;
emulator.commands.ll = (env, args) => {
	emulator.commands.ls(env, ["-la", ...args]);
};
emulator.commands.help = help;

var ENTER = 13;
var UP = 38;
var DOWN = 40;

function run(cmd) {
	cmd = replaceTilde(cmd);
	log(prompt.innerHTML + cmd);
	return emulator.run(cmd).then(log, error);
}

var completeFunctions = {};
completeFunctions[UP] = emulator.completeUp;
completeFunctions[DOWN] = emulator.completeDown;

function complete(direction) {
	var completeFunction = completeFunctions[direction];
	if (!completeFunction) {
		return;
	}
	var cursorPosition = input.selectionStart;
	var beforeCursor = input.value.slice(0, cursorPosition);
	completeFunction(beforeCursor).then(function (completion) {
		if (completion) {
			input.value = completion;
			input.setSelectionRange(cursorPosition, cursorPosition);
		}
	});
}

input.addEventListener("keydown", function (e) {
	if (e.altKey || e.metaKey || e.shiftKey || e.ctrlKey) {
		return;
	}
	if (e.which === UP || e.which === DOWN) {
		e.preventDefault();
		complete(e.which);
	}
});

input.addEventListener("keyup", function (e) {
	if (e.which !== ENTER) {
		return;
	}
	prompt.style.display = "none";
	run(replaceTilde(input.value)).then(function () {
		input.value = "";
		document.body.scrollTop = 10e6;
		prompt.style.display = "unset";
		updatePrompt();
	});
});

document.body.addEventListener("click", function () {
	// Prevent when user is selecting text
	if (!window.getSelection().isCollapsed) {
		return;
	}
	input.focus();
});

function updatePrompt() {
	let fullPrompt = "";
	let USERNAME = emulator.state.user;
	let usr =
		"<span style='color: #26a269;'>" + USERNAME + "@" + HOSTNAME + "</span>";
	let dots = "<span style='color: white;'>:</span>";
	emulator.getDir().then((value) => {
		let path = "<span style='color: #08458f'>" + value + "</span>";
		let delimiter = "<span style='color: white'>$ </span>";
		prompt.innerHTML = insertTilde(usr + dots + path + delimiter);
	});
}
updatePrompt();
