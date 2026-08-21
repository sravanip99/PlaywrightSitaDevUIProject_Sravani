//Ways to define a function in JavaScript
function addTwoNumbers() { //Function Declaration   
    var a = 10;
    var b = 20;
    console.log(a + b);
}
addTwoNumbers(); //Calling the function addTwoNumbers

//If we are writing function not required to use arrow function.
//Arrow Function
const addTwoNumbers1 = function addTwoNumbers1() { //Function Expression
    var a = 10;
    var b = 20;
    console.log(a + b);
}
addTwoNumbers1(); //Calling the function addTwoNumbers1

//Arrow Function
const addTwoNumbers2 = () => { //Arrow Function
    var a = 10;
    var b = 20;
    console.log(a + b);
};
addTwoNumbers2(); //Calling the function addTwoNumbers2