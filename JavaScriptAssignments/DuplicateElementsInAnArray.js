function findDuplicateElements(arr) {
    const duplicates = [];
    const seen = new Set();

    for (const element of arr) {
        if (seen.has(element)) {
            duplicates.push(element);
        } else {
            seen.add(element);
        }
    }

    return duplicates;
}
const inputArray = [1, 2, 3, 4, 2, 5, 1];
console.log(findDuplicateElements(inputArray)); // Output: [2, 1]

