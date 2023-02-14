import './App.css';
var RandomWords = require('random-words');

Object.defineProperty(String.prototype, 'capitalise', {
	value: function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	},
	enumerable: false
});

const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '=', '+', '?'];

function Generator() {
	let symbol = symbols[Math.floor(Math.random() * symbols.length)];
	let number = Math.floor(Math.random() * 99);
	let word1 = RandomWords().capitalise();
	let word2 = RandomWords().capitalise();

	console.log(symbol, number, word1, word2);

	let passwordTable = [word1, word2, number, symbol];

	let password = '';

	for (let i = 0; i < 4; i++) {
		let pos = Math.floor(Math.random() * passwordTable.length);
		console.log(pos);
		let temp = passwordTable[pos];
		passwordTable.splice(pos, 1)
		password += temp;
	}

	return (
		<div>
			<h1>{password}</h1>
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
