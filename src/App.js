import './App.css';
import React, { useState } from 'react'
var RandomWords = require('random-words');
var Filter = require('bad-words');
let filter = new Filter();

Object.defineProperty(String.prototype, 'capitalise', {
	value: function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	},
	enumerable: false
});

const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '=', '+', '?'];

function IsBadWord(word) {
	return filter.isProfane(word);
}

function GetRandomWord() {
	let word = "";
	while (IsBadWord(word) || word.length < 5) {
		word = RandomWords();
	}
	return word.capitalise();
}

export async function copyTextToClipboard(text) {
	navigator.clipboard.writeText(text).then(function () {
		console.log('Async: Copying to clipboard was successful!');
	}, function (err) {
		console.error('Async: Could not copy text: ', err);
		document.execCommand('copy', true, text);
	});
}

let password = '';

function Generator() {
	const [showAlert, setShowAlert] = useState(false);

	if (!showAlert) {
		let symbol = symbols[Math.floor(Math.random() * symbols.length)];
		let number = Math.floor(Math.random() * (99 - 10 + 1) + 10);
		let word1 = GetRandomWord();
		let word2 = GetRandomWord();

		let passwordTable = [word1, word2, number, symbol];

		password = '';

		for (let i = 0; i < 4; i++) {
			let pos = Math.floor(Math.random() * passwordTable.length);
			let temp = passwordTable[pos];
			passwordTable.splice(pos, 1)
			password += temp;
		}
	}

	return (
		<div>
			<div>
				<h1 id="password" onClick={() => { copyTextToClipboard(password); setShowAlert(true) }}>{password}</h1>
			</div>
			<div class={"alert alert-success " + (showAlert ? "" : "hidden")} onClick={() => { setShowAlert(false) }}>Password Copied To Clipboard!</div>
		</div>
	);
}

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Generator />
			</header>
		</div>
	);
}

export default App;
