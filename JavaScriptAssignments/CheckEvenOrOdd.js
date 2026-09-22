/*let number = 10; 

function checkEvenOrOdd(number) {
    if (number % 2 === 0) {
        console.log(number + " is an even number.");
    } else {
        console.log(number + " is an odd number.");
    }
}
checkEvenOrOdd(number);*/


function checkEvenOrOdd(number) {
    if (number % 2 === 0) {
        return number + " is an even number.";
    } else {
        return number + " is an odd number.";
    }
}
const number = Number(process.argv[2]);
console.log(checkEvenOrOdd(number));
/*
process.argv[0]	path to node itself
process.argv[1]	path to your file (CheckEvenOrOdd.js)
process.argv[2]	"8" (the first value you typed after the file name)*/
