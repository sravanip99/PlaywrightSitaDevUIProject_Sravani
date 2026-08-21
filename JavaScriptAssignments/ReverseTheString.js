// Reverse the string
let str = "Javascript";
let reversedString = "";
let length = str.length;

for (let i = length - 1; i >= 0; i--) {
    reversedString += str[i];
}   

console.log("Reversed string is: " + reversedString);