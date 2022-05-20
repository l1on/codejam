"use strict";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let testCases = 0;
let numBits = 0;

let currentCase = 0;
let queryCount = 0;
let currentAnswer = [];

let shortcutQueryParams = {
  symmetrySamePos: null,
  symmetrySameBit: "",
  symmetryDiffPos: null,
  symmetryDiffBit: "",
};
let shortcutQueryModeSymmetrySame = false;
let shortcutQueryModeSymmetryDiff = false;
let potentialMutations = [];

process.stdin.on("data", function (inputStdin) {
  const inputStr = inputStdin.trim();
  if (inputStr.length === 1) {
    if (inputStr === "N") {
      process.exit(1);
    }

    if (inputStr === "Y") {
      if (currentCase === testCases) process.exit(0);
      else Solve("");
    } else {
      Solve(inputStr);
    }
  } else {
    const initInput = inputStr.split(" ");
    testCases = parseInt(initInput[0]);
    numBits = parseInt(initInput[1]);

    Solve("");
  }
});

function Solve(bit) {
  if (bit.length === 0) {
    currentCase += 1;
    currentAnswer = [];
    queryCount = 0;
  } else if (shortcutQueryParams.symmetrySamePos === -1) {
    if (bit === shortcutQueryParams.symmetryDiffBit) {
      potentialMutations = ["N"];
    } else {
      potentialMutations = ["C"];
    }
  } else if (shortcutQueryParams.symmetryDiffPos === -1) {
    if (bit === shortcutQueryParams.symmetrySameBit) {
      potentialMutations = ["N"];
    } else {
      potentialMutations = ["C"];
    }
  } else if (shortcutQueryModeSymmetrySame) {
    if (bit === shortcutQueryParams.symmetrySameBit) {
      potentialMutations = ["N", "R"];
    } else {
      potentialMutations = ["C", "CR"];
    }
  } else if (shortcutQueryModeSymmetryDiff) {
    if (bit === shortcutQueryParams.symmetryDiffBit) {
      if (potentialMutations.join("") === "NR") {
        potentialMutations = ["N"];
      } else {
        potentialMutations = ["CR"];
      }
    } else {
      if (potentialMutations.join("") === "NR") {
        potentialMutations = ["R"];
      } else {
        potentialMutations = ["C"];
      }
    }
  } else {
    currentAnswer[getNextEmptyPos(currentAnswer)] = bit;
  }

  if (potentialMutations.length === 1) {
    recoverAnswer(potentialMutations[0]);
  }

  if (nonEmptyLen(currentAnswer) === numBits) {
    console.log(currentAnswer.join(""));
  } else if (queryCount % 10 === 0 && queryCount !== 0) {
    updateShortcutQueryParams(currentAnswer);
    if (shortcutQueryParams.symmetrySamePos === -1) {
      query(shortcutQueryParams.symmetryDiffPos);
    } else if (shortcutQueryParams.symmetryDiffPos === -1) {
      query(shortcutQueryParams.symmetrySamePos);
    } else {
      shortcutQueryModeSymmetrySame = true;
      shortcutQueryModeSymmetryDiff = false;
      query(shortcutQueryParams.symmetrySamePos);
    }
  } else if (shortcutQueryModeSymmetrySame) {
    shortcutQueryModeSymmetrySame = false;
    shortcutQueryModeSymmetryDiff = true;
    query(shortcutQueryParams.symmetryDiffPos);
  } else {
    query(getNextEmptyPos(currentAnswer));
  }
}

function query(pos) {
  queryCount++;
  console.log(pos + 1);
}

function getNextEmptyPos(currentAnswer) {
  if (nonEmptyLen(currentAnswer) % 2 === 0) {
    return nonEmptyLen(currentAnswer) / 2;
  } else {
    return numBits - parseInt(nonEmptyLen(currentAnswer) / 2) - 1;
  }
}

function updateShortcutQueryParams(currentAnswer) {
  const stopAt = parseInt(nonEmptyLen(currentAnswer) / 2);
  for (let i = 0; i < stopAt; i++) {
    if (currentAnswer[i] === currentAnswer[numBits - 1 - i]) {
      shortcutQueryParams.symmetrySameBit = currentAnswer[i];
      shortcutQueryParams.symmetrySamePos = i;
    } else {
      shortcutQueryParams.symmetryDiffBit = currentAnswer[i];
      shortcutQueryParams.symmetryDiffPos = i;
    }
  }

  if (shortcutQueryParams.symmetrySamePos === null) {
    shortcutQueryParams.symmetrySamePos = -1;
  }

  if (shortcutQueryParams.symmetryDiffPos === null) {
    shortcutQueryParams.symmetryDiffPos = -1;
  }

  if (
    shortcutQueryParams.symmetryDiffPos === -1 &&
    shortcutQueryParams.symmetrySamePos === -1
  ) {
    console.error(
      "Something is wrong. Both symmetryDiffPos and symmetrySamePos are -1!"
    );
  }
}

function recoverAnswer(mutation) {
  switch (mutation) {
    case "R":
      currentAnswer.reverse();
      break;
    case "C":
      flip(currentAnswer);
      break;
    case "CR":
      flip(currentAnswer);
      currentAnswer.reverse();
      break;
  }

  if (nonEmptyLen(currentAnswer) % 2 !== 0) {
    nullifyMiddle(currentAnswer);
  }

  shortcutQueryParams = {
    symmetrySamePos: null,
    symmetrySameBit: "",
    symmetryDiffPos: null,
    symmetryDiffBit: "",
  };
  shortcutQueryModeSymmetrySame = false;
  shortcutQueryModeSymmetryDiff = false;
  potentialMutations = [];
}

function nonEmptyLen(arr) {
  return arr.filter(Boolean).length;
}

function flip(arr) {
  arr.forEach((bit, i) => {
    if (bit === "0") arr[i] = "1";
    else arr[i] = "0";
  });
}

function nullifyMiddle(arr) {
  const right = numBits - parseInt(nonEmptyLen(arr) / 2) - 1;
  const left = parseInt(nonEmptyLen(arr) / 2);
  if (arr[right] === undefined) arr[left] = undefined;
  else arr[right] = undefined;
}
