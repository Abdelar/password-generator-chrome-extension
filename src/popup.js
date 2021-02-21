const state = {
	inputs: [
		{
			name: 'alphabetsInput',
			selector: '#alphabets',
			parameter: 'checked',
			value: true,
		},
		{
			name: 'numbersInput',
			selector: '#numbers',
			parameter: 'checked',
			value: true,
		},
		{
			name: 'symbolsInput',
			selector: '#symbols',
			parameter: 'checked',
			value: true,
		},
		{
			name: 'passwordLengthInput',
			selector: '#passwordLength',
			parameter: 'value',
			value: 16,
		},
	],
	lowercase: 'abcdefghijklmnopqrstuvwxyz',
	uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	numbers: '0123456789',
	symbols: '!@#$%^&*()+_-=}{[]|:;"/?.><,`~',
};

document.querySelector('#lengthValue').innerText = formatCharactersNumber(16);
updatePasswordArea();

state.inputs.map(input => {
	input.node = document.querySelector(input.selector);
	input.node[input.parameter] = input.value;
	input.node.addEventListener('change', event => {
		if (input.name === 'passwordLengthInput') {
			input.value = event.target.value;
			document.querySelector('#lengthValue').innerText = formatCharactersNumber(
				input.value
			);
		} else input.value = event.target.checked;
	});
});

document
	.querySelector('#generate')
	.addEventListener('click', updatePasswordArea);

document.querySelector('#copy').addEventListener('click', copy);

function updatePasswordArea() {
	document.querySelector('textarea').value = generatePassword();
}

function generatePassword() {
	let pool = state.lowercase + state.uppercase;
	if (state.inputs[1].value) pool += state.numbers;
	if (state.inputs[2].value) pool += state.symbols;
	return shuffle(pool.split('')).slice(0, state.inputs[3].value).join('');
}

function shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

function copy() {
	document.querySelector('textarea').select();
	document.execCommand('copy');
}

function formatCharactersNumber(value) {
	return (
		Number(value).toLocaleString('en-US', {
			minimumIntegerDigits: 2,
			useGrouping: false,
		}) + ' Characters'
	);
}
