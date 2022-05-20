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

function hasDuplicates(array) {
  const seenSoFar = {};
  for (const value of array) {
    if (seenSoFar[value] === undefined) {
      seenSoFar[value] = true;
    } else {
      return true;
    }
  }
  return false;
}

function trace(matrix) {
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    sum += matrix[i][i];
  }
  return sum;
}

function numRepeatRows(matrix) {
  let repeatCount = 0;

  for (let i = 0; i < matrix.length; i++) {
    if (hasDuplicates(matrix[i])) {
      repeatCount += 1;
    }
  }

  return repeatCount;
}

function numRepeatCols(matrix) {
  let repeatCount = 0;

  for (let j = 0; j < matrix.length; j++) {
    const col = [];
    for (let i = 0; i < matrix.length; i++) {
      col.push(matrix[i][j]);
    }
    if (hasDuplicates(col)) {
      repeatCount += 1;
    }
  }

  return repeatCount;
}

function Solve(matrix) {
  return `${trace(matrix)} ${numRepeatRows(matrix)} ${numRepeatCols(matrix)}`;
}

function main() {
  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const n = parseInt(readLine().trim(), 10);

    let matrix = Array(n);

    for (let i = 0; i < n; i++) {
      matrix[i] = readLine()
        .replace(/\s+$/g, "")
        .split(" ")
        .map((containerTemp) => parseInt(containerTemp, 10));
    }

    const result = `Case #${qItr + 1}: ${Solve(matrix)}`;

    console.log(result);
  }
}
