import { useEffect, useState } from 'react';

import { commandHandler, getFullPathname } from './commandHandler';
import './css/main.css';
import type { Directory } from './directory/directory';
import { root } from './directory/directory';

function App() {
  const [path, setPath] = useState<Directory>(root);
  const [outputs, setOutputs] = useState<string[]>([]);
  const [selectedOutputIndex, setSelectedOutputIndex] = useState<number>();
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const addOutput = (output: string[]) => {
    setOutputs((prev) => [...prev, ...output]);
  };

  async function handleCommand(text: string) {
    setCommandHistory((prev) => [...prev, text]);
    setSelectedOutputIndex(undefined);
    await commandHandler(text, path, setPath, addOutput);
  }

  window.onkeydown = (e) => {
    const input = document.getElementById('cli-input');
    if (!input) return;
    if (e.key == 'Enter') return;
    if (window.getSelection()?.anchorNode?.parentElement == input) {
      return;
    }
    const range = document.createRange();
    range.selectNodeContents(input);
    range.collapse(false);

    // Clear existing selection and add the new range
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          setSelectedOutputIndex((prev) => {
            if (prev == 0) return 0;
            return prev ? prev - 1 : commandHistory.length - 1;
          });
          break;
        case 'ArrowDown':
          setSelectedOutputIndex((prev) => {
            if (prev == undefined) return undefined;
            if (prev + 1 < commandHistory.length) return prev + 1;
            return undefined;
          });
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [commandHistory]);

  useEffect(() => {
    const ele = document.getElementById('cli-input') as HTMLElement;
    ele.innerText =
      selectedOutputIndex == undefined
        ? ''
        : commandHistory[selectedOutputIndex];
  }, [selectedOutputIndex, commandHistory]);

  // TODO: Probably should let the user scroll. Only do this on new commands
  useEffect(() => {
    document
      .getElementById('cli-output')
      ?.scrollTo(0, document.getElementById('cli-output')?.scrollHeight ?? 0);
  });

  return (
    <div className="cli-container">
      <div className="cli-output" id="cli-output">
        <div className="cli-line">
          Welcome to 'owenmoogk.github.io' <br />
          Type 'help' to see a list of commands.
        </div>
        {outputs.map((text, key) => (
          <div className="cli-line" key={key}>
            {text}
          </div>
        ))}
      </div>
      <div className="cli-input">
        <span className="prompt">{getFullPathname(path)}&gt;</span>
        <div
          contentEditable
          id="cli-input"
          autoFocus
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              e.preventDefault();
              void handleCommand((e.target as HTMLElement).innerText.trim());
              (e.target as HTMLElement).innerText = '';
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
