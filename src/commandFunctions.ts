import { SetStateAction } from "react";
import { blurb } from "./blurb";
import { EnumType } from "typescript";
import * as api from "./api";
import { commands } from "./commands";


export type CommandArgs = {
	path: string;
	setPath: Function;
	args: string[];
};


export function ls(){

}



export function help(args: CommandArgs){
	return (
`Commands: ${Object.keys(commands).join(", ")}
Type a command to see arguments
`)
}

export function about(args: CommandArgs){
	return(blurb)
}

export function open(args: CommandArgs){
	var arg = args.args[0]
	if (!arg){
		return (
`Usage:
	open <resource>
	Resources:
		${Object.keys(api.getExternalLinks())}
`
		)
	}
	if (Object.keys(api.getExternalLinks()).includes(arg)){
		window.open(api.getExternalLinks()[arg])
	}
	else return `'${arg}' not recognized as an argument to 'open'.`
}

export function cd(args: CommandArgs){

}
