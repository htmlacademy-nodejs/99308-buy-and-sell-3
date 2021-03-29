'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }
  return someArray;
};

const getPictureFileName = (number) => {
  return `item${number.toString().padStart(2, 0)}.jpg`;
};

const getRandomItem = (someArray) => {
  return someArray[Math.ceil(Math.random() * someArray.length - 1)];
};

module.exports = {getRandomInt, shuffle, getPictureFileName, getRandomItem};
