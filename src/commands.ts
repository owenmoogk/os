import { Command } from "./commandHandler";
import * as cmd from "./commandFunctions";

var cd: Command = {
	name: "cd",
	args: ["*"],
	functionCall: cmd.cd
}

var ls: Command = {
	name: "ls",
	args: [],
	functionCall: cmd.ls
}

var help: Command = {
	name: "help",
	args: ["*"],
	functionCall: cmd.help
}

var about: Command = {
	name: "about",
	args: [],
	functionCall: cmd.about
}

var open: Command = {
	name: "open",
	args: ["website", "linkedin", "github"],
	functionCall: cmd.open
}

export var commands: Record<string, Command> = {
	"cd": cd,
	"ls": ls,
	"help": help,
	"about": about,
	"open": open,
}