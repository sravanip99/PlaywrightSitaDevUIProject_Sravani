function findLargestNumber(a,b,c) {
    if (a >= b && a >= c) {
        return a;
    } else if (b >= a && b >= c) {
        return b;
    } else {
        return c;
    }
}
const a = Number(process.argv[2]);
const b = Number(process.argv[3]);
const c = Number(process.argv[4]);
if (isNaN(a) || isNaN(b) || isNaN(c)) {
    console.log("Please provide three valid numbers as command line arguments.");
} else {
    console.log("The largest number among " + a + ", " + b + ", and " + c + " is: " + findLargestNumber(a, b, c));
}   
