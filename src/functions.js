export function log(result) {
	let output = document.getElementById("output");
	if (result) {
		result = insertTilde(result);
		if (result.includes("\n")) {
			let lines = result.split("\n");
			for (let l = 0; l < lines.length; l++) {
				const line = lines[l];
				let e = document.createElement("p");
				e.innerHTML = line || " ";
				addOutputElement(e);
			}
		} else {
			let e = document.createElement("p");
			e.innerHTML = result;
			addOutputElement(e);
		}
	}
	updateScroll();
}
export function error(result) {
	result = replaceTilde(result || "");
	log('<div class="error">' + result + "</div>");
	updateScroll();
}
export function addOutputElement(element) {
	let output = document.getElementById("output");
	output.appendChild(element);
}
export function updateScroll() {
	window.scrollTo(0, window.innerHeight);
}
export function replaceTilde(inp) {
	inp = String(inp);
	return inp.replace(/~/g, "/home/" + window.USERNAME);
}
export function insertTilde(inp) {
	inp = String(inp);
	return inp.replace(new RegExp("/home/" + window.USERNAME, "g"), "~");
}
