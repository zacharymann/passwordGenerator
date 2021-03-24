// Generator Functions

// Function that returns a random index (number) of a string value that is passed in as an argument
function randomIndex(str){
  return Math.floor(Math.random() * str.length);
}
console.log(randomIndex(`example`));

// Functions that returns a random letter using a random index in the "letter" string variable
function randomLetter(){
  const letters = `abcdefghijklmnopqrstuvwxyz`;
  return letters[randomIndex(letters)];
}
console.log(randomLetter());

function getRandomUpper(){
  // Running the "randomLetter" function to create a random letter and setting that value to the letter variable
  const letter = randomLetter();
  // Changing the letter to an Uppercase letter and returning it from the function
  return letter.toUpperCase();
}
console.log(getRandomUpper());

function getRandomLower(){
  // Running the "randomLetter" function to create a random letter and returning it from the function
  return randomLetter();
}
console.log(getRandomLower());

function getRandomNumber(){
  const numbers = `1234567890`;
  // Return a random number using a random index in the "numbers" string
  return numbers[randomIndex(numbers)];
}
console.log(getRandomNumber());

function getRandomSymbol(){
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  // Returning a random symbol using a random index in the "symbols" string
  return symbols[randomIndex(symbols)];
}
console.log(getRandomSymbol());

// Object to store all the generator functions
const randomFunc = {
  upper: getRandomUpper,
  lower: getRandomLower,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

// Selecting the DOM Elements
const resultEl = document.querySelector(`#result`);
const lengthEl = document.querySelector(`#length`);
const uppercaseEl = document.querySelector(`#uppercase`);
const lowercaseEl = document.querySelector(`#lowercase`);
const numbersEl = document.querySelector(`#numbers`);
const symbolsEl = document.querySelector(`#symbols`);
const generateEl = document.querySelector(`#generate`);
const clipboardEl = document.querySelector(`#clipboard`);

// Generate Password Function (Function that accepts true or false values as well as a number as arguments)
function generatePassword(upper, lower, number, symbol, length){
  // console.log(upper, lower, number, symbol, length);

  // 1. Create the password variable
  let generatedPassword = ``;

  // 2. Filter out unchecked types
  // True and false values can be added together (True is 1 and false is 0)
  const typesCount = upper + lower + number + symbol;
  console.log(typesCount);

  // If user has not selected any of the four options, then display alert and return an empty string from the function
  if (typesCount === 0){
    alert(`Please select at least one option`);
    return "";
  }

  let typesArr = [
    [`upper`, upper],
    [`lower`, lower],
    [`number`, number],
    [`symbol`, symbol]
  ];

  // The filter method creates a new array with all the elements that pass the test implemented by the provided function
  typesArr = typesArr.filter(item => {
    console.log(item[1]);
    return item[1];
  });
  console.log(typesArr);

  // 3. Loop over the length and call the generator function for each checked type
  // Building password with a for loop
  for (i = 0; i < length; i += typesCount){
    typesArr.forEach(type => {
      const funcName = type[0];
      // console.log(funcName);
      generatedPassword += randomFunc[funcName]();
      console.log(generatedPassword);
    });
  }

  // 4. Add the final password to the password variable and return it from the function
  // Removing extra characters if necessary (The above loop will create a password that may not match the length selected if that length is not a multiple of the number of types selected)
  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}
// generatePassword(true, true, true, true, 5);

// Event listener for when the "Generate Password" button is clicked
generateEl.addEventListener(`click`, () => {
  // Changing value from a string to a number
  const length = parseInt(lengthEl.value);

  // Checking if the following options/checkboxes are selected/checked and setting the returned true/false values to the respective variables
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  console.log(hasUpper, hasLower, hasNumber, hasSymbol, length);

  // The generatePassword function takes the true/false values determined by the checkboxes as well as the number from the number input as arguments and returns a string (AKA The generated password) which is set as the value for the innerText property for the result element/span
  resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
});

// Copy password to clipboard
clipboardEl.addEventListener(`click`, () => {
  const textArea = document.createElement(`textarea`);
  const password = resultEl.innerText;

  // If user clicks clipboard while no password is displayed the function will end and nothing will be copied to the clipboard
  if (password === ""){
    alert(`Please generate a password first`);
    return;
  }

  // Setting the value for the textArea to the password that is currently being displayed
  textArea.value = password;
  // Selecting the body element
  const body = document.querySelector(`body`);
  // Adding the textarea to the webpage
  body.append(textArea);
  // Selecting the value inside the textarea
  textArea.select();
  // Copying the selected value
  document.execCommand(`copy`);
  // Removing the textarea element from the webpage/document
  textArea.remove();
  alert(`Password has been copied to the clipboard!`);
});
