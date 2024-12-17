import { promises as fs } from "fs";

function isSafeArr(arr) {
  let isSafe = true;

  const isIncreasing = arr[1] - arr[0] > 0;
  const isDecreasing = arr[1] - arr[0] < 0;

  for (let i = 1; i < arr.length; i++) {
    const nextGap = arr[i] - arr[i - 1];
    const isInvalidCase =
      nextGap === 0 ||
      (nextGap > 0 && isDecreasing) ||
      (nextGap < 0 && isIncreasing) ||
      Math.abs(nextGap) > 3;
    if (isInvalidCase) {
      isSafe = false;
      break;
    }
  }
  return { isSafe };
}

async function process() {
  try {
    const data = await fs.readFile("input.txt", "utf8");
    const lines = data.trim().split("\n");

    let count1 = 0,
      count2 = 0;
    lines.forEach((line) => {
      const arr = line.trim().split(/\s+/).map(Number);

      const { isSafe } = isSafeArr(arr);
      if (isSafe) {
        count1++;
        count2++;
      } else {
        for (let j = 0; j < arr.length; j++) {
          const newArr = arr.slice(0, j).concat(arr.slice(j + 1));
          const { isSafe: isSafeNew } = isSafeArr(newArr);
          if (isSafeNew) {
            count2++;
            break;
          }
        }
      }
    });

    console.log({ count1, count2 });
  } catch (err) {
    console.log(err);
  }
}

process();
