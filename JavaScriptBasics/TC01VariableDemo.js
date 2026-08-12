var name = "John";
console.log(name);
//Javascript- 3 Major keyword - Variables
//var, let and const
var m = 200;
console.log(m); 

let m1 = 200;
console.log(m1);

const m2 = 400;
console.log(m2);

let m3 = true;
console.log(m3);    

/*VAR
1. It can be re-declared
2. It can be re-assigned
3. It is function scoped
*/

//Here we dont have any float data type in JS, we have only number data type which can be used for both integer and float values

var firstName = "John";
console.log(firstName);

firstName = "Doe"; //Reassigning the value of firstName
console.log(firstName);

var firstName = 200; //Re-declaring the variable firstName with a different data type
console.log(firstName);

// A pair of curly braces {} is called a block in JavaScript. 
// A block is used to group statements together. 
// A block can be used anywhere a statement is allowed. 
// Blocks are often used with control flow statements, such as if statements and loops, to group multiple statements together.
function addTwoNumbers() {
    var a = 10;
    var b = 20;
    console.log(a + b);
}
addTwoNumbers(); //Calling the function addTwoNumbers

/*LET
1. It cannot be re-declared
2. It can be re-assigned
3. It is block scoped       
*/
console.log
let decimalNumber = 10.5;
console.log(decimalNumber);
decimalNumber = 20.5; //Reassigning the value of decimalNumber
console.log(decimalNumber);

//Here we are using a block to demonstrate the block scope of let
console.log("Inside the block");
{
let decimalNumber = 30.5; //Re-declaring the variable decimalNumber with a different data type
console.log(decimalNumber);
}   

/*CONST
1. It cannot be re-declared
2. It cannot be re-assigned
3. It is block scoped       
*/
const a1 = 3.14;
console.log(a1);
const a2 = 10;
console.log(a2);
console.log(typeof a2); //This will return the data type of the variable a2
