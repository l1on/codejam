"use strict";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let inputLines = [];
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputLines = inputString.split("\n");
  inputString = "";

  main();
});

function readLine() {
  return inputLines[currentLine++];
}

function Solve(patterns) {
  let { left: leftWord, right: rightWord } = biSect(patterns[0]);
  let middleWord = "";

  patterns.forEach((pattern) => {
    const {
      left: leftPattern,
      right: rightPattern,
      middle: middlePattern,
    } = biSect(pattern);

    leftWord = calculateWord(leftWord, leftPattern, "l");
    rightWord = calculateWord(rightWord, rightPattern, "r");
    middleWord = `${middleWord}${middlePattern}`;
  });

  return `${leftWord}${rightWord}`.indexOf("*") === -1
    ? `${leftWord}${middleWord}${rightWord}`
    : "*";
}

function biSect(pattern) {
  const firstStarPos = pattern.indexOf("*");
  const lastStarPos = pattern.lastIndexOf("*");
  return {
    left: pattern.substring(0, firstStarPos),
    right: pattern.substring(lastStarPos + 1),
    middle: pattern.substring(firstStarPos, lastStarPos).replace(/\*/g, ""),
  };
}

function calculateWord(word, pattern, matchingMode) {
  if (pattern.length > word.length) {
    [pattern, word] = [word, pattern];
  }

  if (matchingMode === "r") {
    if (word.endsWith(pattern)) {
      return word;
    }
  }

  if (matchingMode === "l") {
    if (word.startsWith(pattern)) {
      return word;
    }
  }

  return "*";
}

function main() {
  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const n = parseInt(readLine().trim(), 10);

    let matrix = Array(n);

    for (let i = 0; i < n; i++) {
      matrix[i] = readLine().replace(/\s+$/g, "");
    }

    const result = `Case #${qItr + 1}: ${Solve(matrix)}`;

    console.log(result);
  }
}
