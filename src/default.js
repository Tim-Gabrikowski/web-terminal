export const defaultState = {
	workingDirectory: "/home/guest",
	user: "guest",
	fileSystem: {
		"/": {
			type: "dir",
			modified: Date.now(),
		},
		"/README.txt": {
			type: "file",
			modified: Date.now(),
			content: "empty",
		},
		"/home": {
			type: "dir",
			modified: Date.now(),
		},
		"/home/guest/journal.txt": {
			type: "file",
			modified: Date.now(),
			content: "this is private!",
		},
		"/home": {
			type: "dir",
			modified: Date.now(),
		},
		"/home/guest": {
			type: "dir",
			modified: Date.now(),
		},
	},
};
export const welcomeMessage = `Welcome to this web terminal!
It uses the npm 'bash-emulator' terminal and a design made by Tim Gabrikowski

This web-terminal features a filesystem 
and the ability to run javascript-scripts stored in the filesystem (WIP).
You can also save your state in localstorage and continue where you left.

type \`help\` to see the list of available commands`;

export const HELP_TEXTS = {
	cat: {
		brief: "Get content of a file",
	},
	cd: {
		brief: "Change directory",
		usage: "cd [path]",
	},
	clear: {
		brief: "Clears the terminal",
	},
	cp: {
		brief: "Copy a file",
		usage: "cp [source] [destination]",
	},
	echo: {
		brief: "Echo a String to the terminal or into files",
		usage: "echo [what to echo] > [files to echo it in]",
	},
	help: {
		brief: "show this list",
	},
	history: {
		brief: "Show previousely used commands",
	},
	ll: {
		brief: "list files in dir (similar to 'ls -la')",
		usage: "ll [dir] (default dir is .)",
	},
	ls: {
		brief: "get files in dir",
	},
	mkdir: {
		brief: "create a new Directory",
		usage: "mkdir [directory]",
	},
	mv: {
		brief: "Move a file or directory",
		usage: "mv [src] [dst]",
	},
	pwd: {
		brief: "return the currend directory",
	},
	rm: {
		brief: "remove a file",
		usage: "rm [file]",
	},
	rmdir: {
		brief: "remove Directory",
		usage: "rmdir [dir]",
	},
	touch: {
		brief: "create a file",
		usage: "touch [filename] [content of file]",
	},
	save: {
		brief: "save current state to localstorage",
	},
};
