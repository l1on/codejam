const {
  getPathsForBits,
  compensatePathsOvershoot,
  compensatePathsUndershoot,
  Solve,
} = require("./pascal-walk");
/*
test("getPathsForBits", () => {
  expect(getPathsForBits("1".split("").reverse())).toEqual([[{ r: 1, k: 1 }]]);

  expect(getPathsForBits("10".split("").reverse())).toEqual([
    [{ r: 1, k: 1 }],
    [
      { r: 2, k: 1 },
      { r: 2, k: 2 },
    ],
  ]);

  expect(getPathsForBits("101".split("").reverse())).toEqual([
    [{ r: 1, k: 1 }],
    [{ r: 2, k: 2 }],
    [
      { r: 3, k: 3 },
      { r: 3, k: 2 },
      { r: 3, k: 1 },
    ],
  ]);

  expect(getPathsForBits("111".split("").reverse())).toEqual([
    [{ r: 1, k: 1 }],
    [
      { r: 2, k: 2 },
      { r: 2, k: 1 },
    ],
    [
      { r: 3, k: 1 },
      { r: 3, k: 2 },
      { r: 3, k: 3 },
    ],
  ]);

  expect(getPathsForBits("11000".split("").reverse())).toEqual([
    [{ r: 1, k: 1 }],
    [{ r: 2, k: 1 }],
    [{ r: 3, k: 1 }],
    [
      { r: 4, k: 1 },
      { r: 4, k: 2 },
      { r: 4, k: 3 },
      { r: 4, k: 4 },
    ],
    [
      { r: 5, k: 5 },
      { r: 5, k: 4 },
      { r: 5, k: 3 },
      { r: 5, k: 2 },
      { r: 5, k: 1 },
    ],
  ]);

  expect(getPathsForBits("1100101011000".split("").reverse())).toEqual([
    [{ r: 1, k: 1 }],
    [{ r: 2, k: 1 }],
    [{ r: 3, k: 1 }],
    [
      { r: 4, k: 1 },
      { r: 4, k: 2 },
      { r: 4, k: 3 },
      { r: 4, k: 4 },
    ],
    [
      { r: 5, k: 5 },
      { r: 5, k: 4 },
      { r: 5, k: 3 },
      { r: 5, k: 2 },
      { r: 5, k: 1 },
    ],
    [{ r: 6, k: 1 }],
    [
      { r: 7, k: 1 },
      { r: 7, k: 2 },
      { r: 7, k: 3 },
      { r: 7, k: 4 },
      { r: 7, k: 5 },
      { r: 7, k: 6 },
      { r: 7, k: 7 },
    ],
    [{ r: 8, k: 8 }],
    [
      { r: 9, k: 9 },
      { r: 9, k: 8 },
      { r: 9, k: 7 },
      { r: 9, k: 6 },
      { r: 9, k: 5 },
      { r: 9, k: 4 },
      { r: 9, k: 3 },
      { r: 9, k: 2 },
      { r: 9, k: 1 },
    ],
    [{ r: 10, k: 1 }],
    [{ r: 11, k: 1 }],
    [
      { r: 12, k: 1 },
      { r: 12, k: 2 },
      { r: 12, k: 3 },
      { r: 12, k: 4 },
      { r: 12, k: 5 },
      { r: 12, k: 6 },
      { r: 12, k: 7 },
      { r: 12, k: 8 },
      { r: 12, k: 9 },
      { r: 12, k: 10 },
      { r: 12, k: 11 },
      { r: 12, k: 12 },
    ],
    [
      { r: 13, k: 13 },
      { r: 13, k: 12 },
      { r: 13, k: 11 },
      { r: 13, k: 10 },
      { r: 13, k: 9 },
      { r: 13, k: 8 },
      { r: 13, k: 7 },
      { r: 13, k: 6 },
      { r: 13, k: 5 },
      { r: 13, k: 4 },
      { r: 13, k: 3 },
      { r: 13, k: 2 },
      { r: 13, k: 1 },
    ],
  ]);

  expect(getPathsForBits("10000".split("").reverse())).toEqual([
    [{ r: 1, k: 1 }],
    [{ r: 2, k: 1 }],
    [{ r: 3, k: 1 }],
    [{ r: 4, k: 1 }],
    [
      { r: 5, k: 1 },
      { r: 5, k: 2 },
      { r: 5, k: 3 },
      { r: 5, k: 4 },
      { r: 5, k: 5 },
    ],
  ]);

  expect(getPathsForBits("11111".split("").reverse())).toEqual([
    [{ r: 1, k: 1 }],
    [
      { r: 2, k: 2 },
      { r: 2, k: 1 },
    ],
    [
      { r: 3, k: 1 },
      { r: 3, k: 2 },
      { r: 3, k: 3 },
    ],
    [
      { r: 4, k: 4 },
      { r: 4, k: 3 },
      { r: 4, k: 2 },
      { r: 4, k: 1 },
    ],
    [
      { r: 5, k: 1 },
      { r: 5, k: 2 },
      { r: 5, k: 3 },
      { r: 5, k: 4 },
      { r: 5, k: 5 },
    ],
  ]);
});

test("compensatePathsOvershoot()", () => {
  let paths = [[11]];
  compensatePathsOvershoot("1".split("").reverse(), paths);
  expect(paths).toEqual([[11]]);

  paths = [[11], [21, 22]];
  compensatePathsOvershoot("10".split("").reverse(), paths);
  expect(paths).toEqual([[11], [22]]);

  paths = [[11], [22], [33, 32, 31]];
  compensatePathsOvershoot("101".split("").reverse(), paths);
  expect(paths).toEqual([[11], [22], [32, 31]]);

  paths = [[11], [22, 21], [31, 32, 33]];
  compensatePathsOvershoot("111".split("").reverse(), paths);
  expect(paths).toEqual([[11], [22, 21], [31, 32, 33]]);

  paths = [[11], [21], [31], [41, 42, 43, 44], [55, 54, 53, 52, 51]];
  compensatePathsOvershoot("11000".split("").reverse(), paths);
  expect(paths).toEqual([[11], [21], [31], [42, 43, 44], [54, 53, 52, 51]]);

  paths = [
    [11],
    [21],
    [31],
    [41, 42, 43, 44],
    [55, 54, 53, 52, 51],
    [61],
    [71, 72, 73, 74, 75, 76, 77],
    [88],
    [99, 98, 97, 96, 95, 94, 93, 92, 91],
    [101],
    [111],
    [121, 122, 123, 124, 125, 126, 127, 128, 129, 1210, 1211, 1212],
    [1313, 1312, 1311, 1310, 139, 138, 137, 136, 135, 134, 133, 132, 131],
  ];
  compensatePathsOvershoot("1100101011000".split("").reverse(), paths);
  expect(paths).toEqual([
    [11],
    [21],
    [31],
    [42, 43, 44],
    [54, 53, 52, 51],
    [61],
    [72, 73, 74, 75, 76, 77],
    [88],
    [98, 97, 96, 95, 94, 93, 92, 91],
    [101],
    [111],
    [122, 123, 124, 125, 126, 127, 128, 129, 1210, 1211, 1212],
    [1312, 1311, 1310, 139, 138, 137, 136, 135, 134, 133, 132, 131],
  ]);

  paths = [[11], [21], [31], [41], [51, 52, 53, 54, 55]];
  compensatePathsOvershoot("10000".split("").reverse(), paths);
  expect(paths).toEqual([[11], [21], [31], [41], [52, 53, 54, 55]]);

  paths = [
    [11],
    [22, 21],
    [31, 32, 33],
    [44, 43, 42, 41],
    [51, 52, 53, 54, 55],
  ];
  compensatePathsOvershoot("11111".split("").reverse(), paths);
  expect(paths).toEqual([
    [11],
    [22, 21],
    [31, 32, 33],
    [44, 43, 42, 41],
    [51, 52, 53, 54, 55],
  ]);
});

test("compensatePathsUndershoot()", () => {
  let paths = [
    [{ r: 1, k: 1 }],
    [{ r: 2, k: 1 }],
    [{ r: 3, k: 1 }],
    [{ r: 4, k: 1 }],
    [
      { r: 5, k: 1 },
      { r: 5, k: 2 },
      { r: 5, k: 3 },
      { r: 5, k: 4 },
      { r: 5, k: 5 },
    ],
  ];
  compensatePathsUndershoot("10000".split("").reverse(), 3, paths);
  expect(paths).toEqual([
    [{ r: 1, k: 1 }],
    [{ r: 2, k: 1 }],
    [{ r: 3, k: 1 }],
    [
      { r: 4, k: 2 },
      { r: 4, k: 1 },
    ],
    [
      { r: 5, k: 1 },
      { r: 5, k: 2 },
      { r: 5, k: 3 },
      { r: 5, k: 4 },
      { r: 5, k: 5 },
    ],
  ]);

  paths = [
    [{ r: 1, k: 1 }],
    [{ r: 2, k: 1 }],
    [{ r: 3, k: 1 }],
    [{ r: 4, k: 1 }],
    [
      { r: 5, k: 1 },
      { r: 5, k: 2 },
      { r: 5, k: 3 },
      { r: 5, k: 4 },
      { r: 5, k: 5 },
    ],
  ];
  compensatePathsUndershoot("10000".split("").reverse(), 1, paths);
  expect(paths).toEqual([
    [{ r: 1, k: 1 }],
    [
      { r: 2, k: 2 },
      { r: 2, k: 1 },
    ],
    [{ r: 3, k: 1 }],
    [{ r: 4, k: 1 }],
    [
      { r: 5, k: 1 },
      { r: 5, k: 2 },
      { r: 5, k: 3 },
      { r: 5, k: 4 },
      { r: 5, k: 5 },
    ],
  ]);

  paths = [
    [{ r: 1, k: 1 }],
    [{ r: 2, k: 1 }],
    [{ r: 3, k: 1 }],
    [{ r: 4, k: 1 }],
    [
      { r: 5, k: 1 },
      { r: 5, k: 2 },
      { r: 5, k: 3 },
      { r: 5, k: 4 },
      { r: 5, k: 5 },
    ],
  ];
  compensatePathsUndershoot("10000".split("").reverse(), 4, paths);
  expect(paths).toEqual([
    [{ r: 1, k: 1 }],
    [
      { r: 2, k: 2 },
      { r: 2, k: 1 },
    ],
    [{ r: 3, k: 1 }],
    [
      { r: 4, k: 2 },
      { r: 4, k: 1 },
    ],
    [
      { r: 5, k: 1 },
      { r: 5, k: 2 },
      { r: 5, k: 3 },
      { r: 5, k: 4 },
      { r: 5, k: 5 },
    ],
  ]);

  paths = [
    [{ r: 1, k: 1 }],
    [{ r: 2, k: 2 }],
    [{ r: 3, k: 3 }],
    [{ r: 4, k: 4 }],
    [
      { r: 5, k: 5 },
      { r: 5, k: 4 },
      { r: 5, k: 3 },
      { r: 5, k: 2 },
      { r: 5, k: 1 },
    ],
  ];
  compensatePathsUndershoot("10000".split("").reverse(), 4, paths);
  expect(paths).toEqual([
    [{ r: 1, k: 1 }],
    [
      { r: 2, k: 1 },
      { r: 2, k: 2 },
    ],
    [{ r: 3, k: 3 }],
    [
      { r: 4, k: 3 },
      { r: 4, k: 4 },
    ],
    [
      { r: 5, k: 5 },
      { r: 5, k: 4 },
      { r: 5, k: 3 },
      { r: 5, k: 2 },
      { r: 5, k: 1 },
    ],
  ]);

  paths = [
    [{ r: 1, k: 1 }],
    [{ r: 2, k: 2 }],
    [
      { r: 3, k: 3 },
      { r: 3, k: 2 },
      { r: 3, k: 1 },
    ],
    [{ r: 4, k: 1 }],
    [{ r: 5, k: 1 }],
    [{ r: 6, k: 1 }],
    [
      { r: 7, k: 1 },
      { r: 7, k: 2 },
      { r: 7, k: 3 },
      { r: 7, k: 4 },
      { r: 7, k: 5 },
      { r: 7, k: 6 },
      { r: 7, k: 7 },
    ],
    [{ r: 8, k: 8 }],
    [
      { r: 9, k: 9 },
      { r: 9, k: 8 },
      { r: 9, k: 7 },
      { r: 9, k: 6 },
      { r: 9, k: 5 },
      { r: 9, k: 4 },
      { r: 9, k: 3 },
      { r: 9, k: 2 },
      { r: 9, k: 1 },
    ],
    [
      { r: 10, k: 1 },
      { r: 10, k: 2 },
      { r: 10, k: 3 },
      { r: 10, k: 4 },
      { r: 10, k: 5 },
      { r: 10, k: 6 },
      { r: 10, k: 7 },
      { r: 10, k: 8 },
      { r: 10, k: 9 },
      { r: 10, k: 10 },
    ],
    [
      { r: 11, k: 11 },
      { r: 11, k: 10 },
      { r: 11, k: 9 },
      { r: 11, k: 8 },
      { r: 11, k: 7 },
      { r: 11, k: 6 },
      { r: 11, k: 5 },
      { r: 11, k: 4 },
      { r: 11, k: 3 },
      { r: 11, k: 2 },
      { r: 11, k: 1 },
    ],
  ];
  compensatePathsUndershoot("11101000100".split("").reverse(), 9, paths);
  expect(paths).toEqual([
    [{ r: 1, k: 1 }],
    [{ r: 2, k: 2 }],
    [
      { r: 3, k: 3 },
      { r: 3, k: 2 },
      { r: 3, k: 1 },
    ],
    [{ r: 4, k: 1 }],
    [
      { r: 5, k: 2 },
      { r: 5, k: 1 },
    ],
    [
      { r: 6, k: 2 },
      { r: 6, k: 1 },
    ],
    [
      { r: 7, k: 1 },
      { r: 7, k: 2 },
      { r: 7, k: 3 },
      { r: 7, k: 4 },
      { r: 7, k: 5 },
      { r: 7, k: 6 },
      { r: 7, k: 7 },
    ],
    [{ r: 8, k: 8 }],
    [
      { r: 9, k: 9 },
      { r: 9, k: 8 },
      { r: 9, k: 7 },
      { r: 9, k: 6 },
      { r: 9, k: 5 },
      { r: 9, k: 4 },
      { r: 9, k: 3 },
      { r: 9, k: 2 },
      { r: 9, k: 1 },
    ],
    [
      { r: 10, k: 1 },
      { r: 10, k: 2 },
      { r: 10, k: 3 },
      { r: 10, k: 4 },
      { r: 10, k: 5 },
      { r: 10, k: 6 },
      { r: 10, k: 7 },
      { r: 10, k: 8 },
      { r: 10, k: 9 },
      { r: 10, k: 10 },
    ],
    [
      { r: 11, k: 11 },
      { r: 11, k: 10 },
      { r: 11, k: 9 },
      { r: 11, k: 8 },
      { r: 11, k: 7 },
      { r: 11, k: 6 },
      { r: 11, k: 5 },
      { r: 11, k: 4 },
      { r: 11, k: 3 },
      { r: 11, k: 2 },
      { r: 11, k: 1 },
    ],
  ]);
});
*/

test("Solve()", () => {
  var pascal = (function generatePascals(numRows) {
    if (numRows === 0) return [];
    if (numRows === 1) return [[1]];
    let result = [];
    for (let row = 1; row <= numRows; row++) {
      let arr = [];
      for (let col = 0; col < row; col++) {
        if (col === 0 || col === row - 1) {
          arr.push(1);
        } else {
          arr.push(result[row - 2][col - 1] + result[row - 2][col]);
        }
      }
      result.push(arr);
    }
    return result;
  })(30);

  for (let problemSum = 1; problemSum <= 100000; problemSum++) {
    const pathsStr = Solve(problemSum);
    let sum = 0;
    let numCells = 0;
    pathsStr
      .split("\n")
      .map((p) => p.split(" "))
      .forEach((p) => {
        let r = p[0];
        let k = p[1];
        sum += pascal[r - 1][k - 1];
        numCells++;
      });
    expect(sum).toEqual(problemSum);
    expect(numCells).toBeLessThan(501);
  }
});
