function findSecondLargest(numbers) {
    let largest = -Infinity;
    let secondLargest = -Infinity;

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > largest) {
            secondLargest = largest;
            largest = numbers[i];
        } else if (numbers[i] > secondLargest && numbers[i] < largest) {
            secondLargest = numbers[i];
        }
    }

    return secondLargest;
}
const numbers = [10, 5, 8, 12, 3];
console.log(findSecondLargest(numbers)); // Output: 10
