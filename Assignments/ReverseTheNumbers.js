// Reverse the number
let number = 3982;
let reversedNumber = 0;

while (number > 0) {
    let digit = number % 10; // Get the last digit
    reversedNumber = (reversedNumber * 10) + digit;
    number = Math.floor(number / 10); // Remove the last digit
}
console.log("Reversed number is: " + reversedNumber);
