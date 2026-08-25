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
let reversedWholeNumber = 0;
//Reverse the whole number and decimal part separately
let wholeNumber = Math.floor(number1);
let decimalNumber = number1 - wholeNumber;
// Reverse the whole number
while (wholeNumber > 0) {
    let digit = wholeNumber % 10; // Get the last digit
    reversedWholeNumber = (reversedWholeNumber * 10) + digit;
    wholeNumber = Math.floor(wholeNumber / 10); // Remove the last digit
}
// Reverse the decimal part
let reversedDecimalNumber = 0;
let decimalDigits = Math.round(decimalNumber * 100); // Convert decimal part to whole number for reversal
while (decimalDigits > 0) {
    let digit = decimalDigits % 10; // Get the last digit
    reversedDecimalNumber = (reversedDecimalNumber * 10) + digit;
    decimalDigits = Math.floor(decimalDigits / 10); // Remove the last digit
}
 let finalReversedNumber = reversedWholeNumber + (reversedDecimalNumber / 100);
console.log("Reversed number with decimal is: " + finalReversedNumber); 
   

