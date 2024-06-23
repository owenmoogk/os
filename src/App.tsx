import { useEffect, useState } from 'react';
import "./css/main.css";
import { commands } from './commands';
import { CommandArgs } from './commandFunctions';
import { commandHandler } from './commandHandler';

var directory: any = {
	"C:\\owenmoogk.github.io": {
		"projects": {

		},
		"work": {

		}
	}
}

function App() {

	const [path, setPath] = useState("C:\\owenmoogk.github.io")
	const [outputs, setOutputs] = useState<string[]>([])
	const [commandStack, setCommandStack] = useState<string[]>([])

	function addOutputs(newOutputs: string[]){
		console.log([...outputs, ...newOutputs])
		setOutputs([...outputs, ...newOutputs])
	}

	function handleCommand(text: string){
		setCommandStack([text, ...commandStack])
		commandHandler(text, path, setPath, addOutputs)
	}

	if (window) {
		window.onkeydown = (e) => {
			var input = document.getElementById("cli-input")
			if (!input) return;
			if (e.key == "Enter") return;
			if (window.getSelection()?.anchorNode?.parentElement == input){
				return
			}
			const range = document.createRange();
			range.selectNodeContents(input);
			range.collapse(false);

			// Clear existing selection and add the new range
			const selection = window.getSelection();
			selection?.removeAllRanges();
			selection?.addRange(range);

		};
	}

	useEffect(() => {
		document?.getElementById("cli-output")?.scrollTo(0, document?.getElementById("cli-output")?.scrollHeight ?? 0);

	})
	

	return (
		<div className="cli-container">
			<div className="cli-output" id="cli-output">
				<div className="cli-line">
					Welcome to 'owenmoogk.github.io' <br/>
					Type 'help' to see a list of commands.
				</div>
				{outputs.map((text) => 
					<div className="cli-line">
						{text}
					</div>
				)}
			</div>
			<div className="cli-input">
				<span className="prompt">{path}&gt;</span>
				<div contentEditable id="cli-input" autoFocus onKeyDown={(e) => {
					if (e.key == "Enter"){
						e.preventDefault()
						handleCommand((e.target as HTMLElement).innerText.trim());
						(e.target as HTMLElement).innerText = ""
					}
				}} />
			</div>
		</div>
	);
}

export default App;
