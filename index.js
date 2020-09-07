const express = require('express');
const bodyParser = require('body-parser');

const port = 3000

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const sentence = req.query.sentence
  if(sentence) {
    const words = sentence.split(' ')
    const cases = words.filter(word => word[0] === word[0].toLowerCase())
    const uppercased = cases.map(word => revertCase(word))
    const ing = words.filter(word => word.toLowerCase().slice(word.length -  3) === 'ing')
    const palindrome = cases.filter(word => word.toLowerCase() === word.split('').reverse().join('').toLowerCase())
    res.json({
      uppercased,
      ing,
      palindrome
    })
  } else {
    res.json({error: 'Sentence not found'})
  }
});

app.listen(port , () => {
  console.log(`Server started, port ${port}`);
});

const revertCase = word => {
  let output = ''
  for (let i = 0; i < word.length; i++) {
    const character = word[i];
    if (character == character.toLowerCase()) {
      // The character is lowercase
      output = output + character.toUpperCase();
    } else {
      // The character is uppercase
      output = output + character.toLowerCase();
    }
  }
  return output
}