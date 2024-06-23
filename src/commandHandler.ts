import { CommandArgs } from "./commandFunctions"
import { commands } from "./commands"

export type Command = {
	name: string,
	args: string[],
	functionCall: (input: CommandArgs) => string | void 
}

function commandError(path: string, command: string, args: string[], addOutputs: Function){
	addOutputs([path+"> " + command + " " + args.join(" "), `'${command}' is not recognized as a valid command or executable.`])
}

function argumentError(path: string, command: string, args: string[], addOutputs: Function){
	addOutputs([path+"> " + command + " " + args.join(" "), `'${args[0]}' is not recognized as a valid argument to '${command}'. Type '${command}' to see valid usage.`])
}

export function commandHandler(input: string, path: string, setPath: Function, addOutputs: Function) {
	var [command, ...args] = input.split(" ")
		
	if (Object.keys(commands).includes(command)){
		var commandObject = commands[command]
		var commandArgs: CommandArgs = {path, setPath, args}

		// if there are no args, or valid first arg, pass to the function to handle the rest
		if (args.length == 0 || commandObject.args.includes(args[0]) || commandObject.args.includes("*")){
			var output = commandObject.functionCall(commandArgs)

			// if there's an output, add the cmd and output, otherwise just add the command
			if (output) addOutputs([path+"> " + input, output])
			else addOutputs([path+"> " + input])
		}

		// an argument is invalid
		else{
			// argument error
			argumentError(path, command, args, addOutputs)
		}
	}
	// command error (doesn't exist)
	else commandError(path, command, args, addOutputs)	
}