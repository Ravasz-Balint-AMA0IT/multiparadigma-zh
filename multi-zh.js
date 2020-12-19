const fs= require('fs')

const word = process.argv[2]

const permutations = findPermutations(word)

var Spellchecker = require("hunspell-spellchecker")

var spellchecker = new Spellchecker()

const dictionary = spellchecker.parse({
  dic: fs.readFileSync("hu_HU.dic")
});

spellchecker.use(dictionary)

var result = permutations.filter(permutation => spellchecker.check(permutation));

console.log("A(z)", word, "szó helyes permutációinak száma:", result.length)
console.log("A(z)", word, "szó helyes permutációi: ")

for (let i = 0; i < result.length; i++) {
  console.log(i + 1 + ":", result[i])
}

function findPermutations(input) {
  if(input.length === 0) {
    return ['']
  }

  const result = {}

  input.split('').forEach(function(char, index) {
      findPermutations(input.slice(0, index) + input.slice(index + 1)).forEach(
          function(permutation) {
              result[char + permutation] = true
          });
  });
  return Object.keys(result)
}