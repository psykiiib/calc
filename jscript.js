let screen1 = document.getElementById('upper-dis');
let screen2 = document.getElementById('lower-dis');
buttons = document.querySelectorAll('button');
let screenValue = '';
screen2.value = "0";
for (item of buttons) {
    item.addEventListener('click', (e) => {
        buttonText = e.target.innerText;
        console.log('Button text is ', buttonText);
        if (buttonText == 'x') {
            buttonText = '*';
            screenValue += buttonText;
            screen1.value = screenValue;
        }
        else if (buttonText == 'D') {
            screen1.value = screen1.value.slice(0, - 1);
        }
        else if (buttonText == 'C') {
            screenValue = "";
            screen1.value = screenValue;
            screen2.value = screenValue;
            screen2.value = "0";
        }
        else if (buttonText == '=') {
            screen2.value = eval(screenValue);
        }
        else {
            screenValue += buttonText;
            screen1.value = screenValue;
        }

    })
}
