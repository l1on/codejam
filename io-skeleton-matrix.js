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

function Solve(matrix) {
  return ``;
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
