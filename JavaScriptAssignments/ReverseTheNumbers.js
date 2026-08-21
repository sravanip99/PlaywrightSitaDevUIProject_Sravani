// Reverse the number
let number = 3982;
let reversedNumber = 0;

while (number > 0) {
    let digit = number % 10; // Get the last digit
    reversedNumber = (reversedNumber * 10) + digit;
    number = Math.floor(number / 10); // Remove the last digit
}
console.log("Reversed number is: " + reversedNumber);
let number1 = 3982.52;
let reversedNumber1 = 0;
//Reverse the whole number and decimal part separately
let wholeNumber = Math.floor(number1);
let decimalNumber = number1 - wholeNumber;

while (wholeNumber > 0) {
    let digit = wholeNumber % 10; // Get the last digit
    reversedNumber1 = (reversedNumber1 * 10) + digit;
    number1 = Math.floor(number1 / 10); // Remove the last digit
}
console.log("Reversed number is: " + reversedNumber1);

