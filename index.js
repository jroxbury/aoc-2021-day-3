const fs = require('fs');
const buffer = fs.readFileSync('real-data.txt');
const data = buffer.toString().split('\n');

const oxygenGeneratorRating = parseInt(getCurrentOneCount(data)[0], 2);
const co2ScrubberRating = parseInt(getCurrentOneCount(data, 0, true)[0], 2);

console.log(oxygenGeneratorRating * co2ScrubberRating);

function getCurrentOneCount(arr, index = 0, isReversed = false) {
  const oneCount = {};

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] == 1) {
        oneCount[j] === undefined ? (oneCount[j] = 1) : (oneCount[j] += 1);
      }
    }
  }

  // Get next digit to check;
  const isZeros = arr.length - oneCount[index] > oneCount[index];

  arr = arr.filter((item) => {
    if (isReversed) {
      if (isZeros) {
        return item[index] == '1';
      }
      return item[index] == '0';
    } else {
      if (isZeros) {
        return item[index] == '0';
      }
      return item[index] == '1';
    }
  });

  if (arr.length <= 1) {
    return arr;
  }

  const nextIndex = index + 1;
  return getCurrentOneCount(arr, nextIndex, isReversed);
}
