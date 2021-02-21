// The global state for the web page
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

// Display the initial password length
document.querySelector('#lengthValue').innerText = formatCharactersNumber(16);
updatePasswordArea();

// Register the event listeners of the inputs
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

// Generate a first password with the default settings
document
	.querySelector('#generate')
	.addEventListener('click', updatePasswordArea);

// Register the event Listener of the copy functionality
document.querySelector('#copy').addEventListener('click', copy);

// Select the password when tabbed to
document
	.querySelector('#password')
	.addEventListener('focus', event => event.target.select());

// Update password function
function updatePasswordArea() {
	document.querySelector('#password').value = generatePassword();
}

// Generate password function
function generatePassword() {
	let pool = state.lowercase + state.uppercase;
	if (state.inputs[1].value) pool += state.numbers;
	if (state.inputs[2].value) pool += state.symbols;
	return shuffle(pool.split('')).slice(0, state.inputs[3].value).join('');
}

// A helper function for shuffling a set of characters in an array
function shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

// Copy the actual password shown on the page to the clipboard
function copy() {
	document.querySelector('#password').select();
	document.execCommand('copy');
}

// A helper function to format the password length
function formatCharactersNumber(value) {
	return (
		Number(value).toLocaleString('en-US', {
			minimumIntegerDigits: 2,
			useGrouping: false,
		}) + ' Characters'
	);
}
