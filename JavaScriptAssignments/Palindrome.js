/*function isPalindrome(str) {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleanedStr = str.replace(/[^0-9a-zA-Z]/g, '').toLowerCase();
    
    // Compare the cleaned string with its reverse
    const reversedStr = cleanedStr.split('').reverse().join('');
    return cleanedStr === reversedStr;
}
console.log(isPalindrome("Madam")); // true
console.log(isPalindrome("Hello")); // false*/

/*function isPalindrome(str) {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleanedStr = str.replace(/[^0-9a-zA-Z]/g, '').toLowerCase();
    
    // Compare the cleaned string with its reverse
    const reversedStr = cleanedStr.split('').reverse().join('');
    return cleanedStr === reversedStr;
}

const input = process.argv[2];

if (!input) {
    console.log("Please type a word after the file name.");
} else if (isPalindrome(input)) {
    console.log(input + " is a palindrome.");
} else {
    console.log(input + " is not a palindrome.");
}*/

function isPalindrome(str) {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleanedStr = str.replace(/[^0-9a-zA-Z]/g, '').toLowerCase();
    // Compare the cleaned string with its reverse
    const reversedStr = cleanedStr.split('').reverse().join('');
    return cleanedStr === reversedStr;
}
const prompt = require('prompt-sync')();
const interactiveInput = prompt("Enter a word: ");
console.log(isPalindrome(interactiveInput) ? interactiveInput + " is a palindrome." : interactiveInput + " is not a palindrome.");
