function countVowels(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i].toLowerCase())) {
            count++;
        }
    }
    return count;
}
const input = process.argv[2];

if (!input) {
    console.log("Please type a word or sentence after the file name.");
} else {
    console.log(countVowels(input));
}