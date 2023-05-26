export function echo(env, args) {
	if (args.filter((a) => a == ">").length > 0) {
		let delIndex = 0;
		args.filter((a, index) => {
			if (a == ">") {
				delIndex = index;
			}
			return a == ">";
		});
		let input = args
			.filter((a, index) => index < delIndex)
			.join(" ")
			.replace(/\\n/g, "\n");
		console.log(input);

		let files = args.filter((a, index) => index > delIndex);
		io.log(input);
		files.forEach((file) => {
			window.emulator.write(file, input).catch(env.error);
		});
	} else {
		io.log(args.join(" "));
	}
	env.exit();
}

import { HELP_TEXTS } from "./default";
export function help(env, args) {
	let lines = ["List of available comands:"];
	for (const cmd in emulator.commands) {
		let doc = HELP_TEXTS[cmd] || {};
		let line = "	" + cmd + "		" + (doc.brief || "");
		lines.push(line);
	}
	for (let l = 0; l < lines.length; l++) {
		const li = lines[l];
		io.log(li);
	}
	env.exit();
}
