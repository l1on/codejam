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

function Solve(line) {
  let answerString = ``;
  let numLeftParenthesis = 0;

  for (const d of line) {
    const diff = d - numLeftParenthesis;
    let parenthesisToAdd = "";

    if (diff > 0) {
      parenthesisToAdd = "(";
    }
    if (diff < 0) {
      parenthesisToAdd = ")";
    }
    numLeftParenthesis += diff;

    answerString = `${answerString}${parenthesisToAdd.repeat(
      Math.abs(diff)
    )}${d}`;
  }

  return `${answerString}${")".repeat(numLeftParenthesis)}`;
}

function main() {
  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const result = `Case #${qItr + 1}: ${Solve(readLine())}`;

    console.log(result);
  }
}
