const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = "";

for (let key of keys) {
	const value = key.dataset.key;

	key.addEventListener('click', () => {
		if (value == "clear") {
			input = "";
            decimalCount = 0;
			display_input.innerHTML = "";
			display_output.innerHTML = "";

		} else if (value == "backspace") {
			if (input.length > 0) {
				input = input.slice(0, -1); 
				display_input.innerHTML = CleanInput(input);
			}
		
			let outputText = display_output.innerHTML;
		
			if (outputText.length > 0) {
				outputText = outputText.slice(0, -1); 
				display_output.innerHTML = outputText;
			}
		
		} else if (value == "=") {
			let result = eval(PerpareInput(input));

			display_output.innerHTML = CleanOutput(result);
        } else if (value == "%") {  
            input += "%";  
            display_input.innerHTML = CleanInput(input);
        } else {
            if (ValidateInput(value)) {
                input += value;
                display_input.innerHTML = CleanInput(input);
            }
		}
	})
}

function CleanInput(input) {
	let input_array = input.split("");
	let input_array_length = input_array.length;

	for (let i = 0; i < input_array_length; i++) {
		if (input_array[i] == "*") {
			input_array[i] = ` <span class="operator">x</span> `;
		} else if (input_array[i] == "/") {
			input_array[i] = ` <span class="operator">÷</span> `;
		} else if (input_array[i] == "+") {
			input_array[i] = ` <span class="operator">+</span> `;
		} else if (input_array[i] == "-") {
			input_array[i] = ` <span class="operator">-</span> `;
		} else if (input_array[i] == "%") {
			input_array[i] = `<span class="percent">%</span>`;
		}
	}

	return input_array.join("");
}

function CleanOutput (output) {

    const roundedOutput = Math.round(output * 100) / 100;

	let output_string = roundedOutput.toString();
	let decimal = output_string.split(".")[1];
	output_string = output_string.split(".")[0];

	let output_array = output_string.split("");
	
	if (output_array.length > 3) {
		for (let i = output_array.length - 3; i > 0; i -= 3) {
			output_array.splice(i, 0, ",");
		}
	}

	if (decimal) {
		output_array.push(".");
		output_array.push(decimal);
	}

	return output_array.join("");
}

let decimalCount = 0; 

function ValidateInput(value) {
    let lastInput = input.slice(-1);
    let operators = ["+", "-", "*", "/"];

    if (value === "clear") {
        input = "";
        decimalCount = 0;
        return true;
    }

    if (operators.includes(value)) {
        if (
            operators.includes(lastInput) ||
            lastInput === "+" ||
            lastInput === "-" ||
            lastInput === "*" ||
            lastInput === "/"
        ) {
            return false;
        } else {
            decimalCount = 0;
            return true;
        }
    }

    if (value === ".") {
        if (lastInput === "." || decimalCount >= 1) {
            return false;
        } else {
            decimalCount++;
            return true;
        }
    }

    if (!isNaN(value) || (value === "." && !input.includes("."))) {
        return true;
    }

    return false;
}


function PerpareInput (input) {
	let input_array = input.split("");

	for (let i = 0; i < input_array.length; i++) {
		if (input_array[i] == "%") {
			input_array[i] = "/100";
		}
	}

	return input_array.join("");
}

// for keyboard inputs

function handleKeyboardInput(event) {
    const keyValue = event.key;
    
    const keyMappings = {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '0': '0',
        '.': '.',
        '+': '+',
        '-': '-',
        '*': '*',     
        '/': '/',      
        '%': '%',
		'=':'=',
        'Enter': '=',  
        'Backspace': 'backspace', 
        'Delete': 'clear' 
    };

   
    if (keyMappings.hasOwnProperty(keyValue)) {
        const value = keyMappings[keyValue];
        const keyElement = document.querySelector(`[data-key="${value}"]`);

        if (keyElement) {
            if (value === '%') {
                input += '%';  
                display_input.innerHTML = CleanInput(input);
            } else {
                keyElement.click();
            }
        }
    }
}

document.addEventListener('keydown', handleKeyboardInput);


// changing mode 

let theme = document.getElementById('mode-icon');

theme.addEventListener('change',()=>{
	document.body.classList.toggle('dark');
})



