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

const Solve = function (sum) {
  const binDigitsLittleEndian = parseInt(sum).toString(2).split("").reverse();

  const paths = getPathsForBits(binDigitsLittleEndian);

  // skip a '1' cell in ONE rows, potentially to the max num of ONE rows
  const residualOvershoot = compensatePathsOvershoot(
    binDigitsLittleEndian,
    paths
  );

  // All ZERO rows have been compensated by simplying skipping 1s in ONE rows
  if (residualOvershoot <= 0) {
    return printPaths(paths);
  }

  // Compensate one more ZERO row
  paths[paths.length - 1].pop();

  if (residualOvershoot === 1) {
    return printPaths(paths);
  }

  // Compensate more than one remaining ZERO rows
  paths[paths.length - 1].pop();
  compensatePathsUndershoot(
    binDigitsLittleEndian,
    binDigitsLittleEndian.length - residualOvershoot,
    paths
  );
  return printPaths(paths);
};

function main() {
  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const result = `Case #${qItr + 1}:\n${Solve(readLine())}`;

    console.log(result);
  }
}

function printPaths(paths) {
  return paths
    .flat()
    .map((p) => `${p.r} ${p.k}`)
    .join("\n");
}

function generateRowPaths(rowNum, nonReversed) {
  let cols = [];
  if (nonReversed === true) {
    cols = [...Array(rowNum).keys()];
  } else {
    cols = [...Array(rowNum).keys()].reverse();
  }
  return cols.map((k) => {
    return { r: rowNum, k: k + 1 };
  });
}

function getPathsForBits(bits) {
  let paths = [];
  let lToR = false;
  bits.forEach((bit, i) => {
    if (bit === "1") {
      lToR = !lToR;
      paths.push(generateRowPaths(i + 1, lToR));
    } else {
      paths.push([generateRowPaths(i + 1, lToR).pop()]);
    }
  });

  return paths;
}

function compensatePathsOvershoot(bits, paths) {
  const onePositions = [];
  bits.forEach((bit, i) => {
    if (bit === "1" && i !== 0) onePositions.push(i);
  });

  let residualOvershoot = 0;
  bits.forEach((bit) => {
    if (bit === "0") {
      const onePos = onePositions.shift();
      if (onePos !== undefined) {
        paths[onePos].shift();
      } else {
        residualOvershoot++;
      }
    }
  });
  return residualOvershoot;
}

function compensatePathsUndershoot(bits, undershootNum, paths) {
  const zeroPositions = [];
  bits.forEach((bit, i) => {
    if (bit === "0" || i === 0) zeroPositions.push(i);
  });

  const { p1, p2 } = getPostionsToSum(undershootNum, zeroPositions);

  [p1, p2].forEach((p) => {
    if (p === 0) return;

    const { r, k } = paths[p].pop();
    if (k === 1) {
      paths[p] = [
        { r: r, k: 2 },
        { r: r, k: 1 },
      ];
    } else if (k === r) {
      paths[p] = [
        { r: r, k: k - 1 },
        { r: r, k: k },
      ];
    } else {
      console.error(`row ${p} is not a valid zero row!`);
    }
  });
}

function getPostionsToSum(sum, positions) {
  for (let l = 0, r = positions.length - 1; l !== r; ) {
    const result = positions[l] + positions[r];
    if (result === sum)
      return {
        p1: positions[l],
        p2: positions[r],
      };
    if (result > sum) r--;
    else l++;
  }
}
