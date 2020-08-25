import quotes from "TinyManager/assets/quotes";

const count = quotes.length;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getQuote() {
  const randomNumber = getRandomInt(count - 1);
  return quotes[randomNumber];
}

export default {
  getQuote,
};
