//IF
//IF ELSE
//IF ELSE IF
//SWITCH CASE

if(false){
    console.log("I am in IF Block");
}

console.log("***************IFELSE*******************")

if(1==0){
    console.log("This is for 1=0")
}else{
    console.log("I am in ELSE Block");
}

// = --> Assignment
// == --> Equality
// === --> Strict Equality
console.log("***************IFELSEIF*******************")
let a = 100;
let day = "Tuesday";
if(day == "Monday"){
    console.log("I am in Monday");
}
else if(day == "Tuesday"){
    console.log("I am in Tuesday");
}
else if(day == "Wednesday"){
    console.log("I am in Wednesday");
}
else if(day == "Friday"){ 
    console.log("I am in Thursday");
} else
{
    console.log("I am in ELSE Block of IFELSEIF");
}

switch(day){
    case "Monday":
        console.log("I am in Monday");
        break;
    case "Tuesday":
        console.log("I am in Tuesday");
        break;
    case "Wednesday":
        console.log("I am in Wednesday");
        break;
    case "Thursday":
        console.log("I am in Thursday");
        break;
    default:
        console.log("I am in DEFAULT Block of SWITCH");
}

switch(1)
{
    case 1:
        console.log("I am in 1");
        break;
    case 2:
        console.log("I am in 2");
        break;
}

let browser = "Chrome";
switch(browser){
    case "Chrome":
        console.log("I am in Chrome");
        break;
    case "Firefox":
        console.log("I am in Firefox"); 
        break;
    case "Edge":
        console.log("I am in Edge");    
        break;
    default:
        console.log("I am in DEFAULT Block of SWITCH");
}
