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
  const assignment = [];
  const candidates = ["C", "J"];

  const times = [];
  matrix.forEach((schedule, index) => {
    times.push(
      {
        time: schedule[0],
        isStartTime: true,
        activity: index,
      },
      {
        time: schedule[1],
        isStartTime: false,
        activity: index,
      }
    );
  });

  times.sort((timeA, timeB) => {
    if (timeA.time - timeB.time !== 0) return timeA.time - timeB.time;

    if (timeA.isStartTime === false) return -1;
    if (timeB.isStartTime === false) return 1;
  });

  for (const time of times) {
    if (time.isStartTime === true) {
      if (candidates.length === 0) return "IMPOSSIBLE";
      assignment[time.activity] = candidates.pop();
    } else {
      candidates.push(assignment[time.activity]);
    }
  }

  return assignment.join("");
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
