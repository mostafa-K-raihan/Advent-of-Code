import { promises as fs } from "fs";

async function processFile() {
  const locations1 = [],
    locations2 = [];
  try {
    const data = await fs.readFile("input.txt", "utf8");
    console.log(data);

    const lines = data.trim().split("\n");

    lines.forEach((line, index) => {
      const [num1, num2] = line.trim().split(/\s+/).map(Number);
      locations1.push(num1);
      locations2.push(num2);
    });

    locations1.sort((a, b) => a - b);
    locations2.sort((a, b) => a - b);

    const M = locations2.reduce((acc, next) => {
      if (acc[next]) {
        acc[next] = acc[next] + 1;
      } else {
        acc[next] = 1;
      }
      return acc;
    }, {});
    console.log(M);

    let result = 0;
    for (let i = 0; i < locations1.length; i++) {
      result += Math.abs(locations1[i] - locations2[i]);
    }

    let res = 0;
    for (let i = 0; i < locations1.length; i++) {
      const first = locations1[i];
      const second = M[first] ?? 0;

      res += first * second;
    }

    console.log(res);
  } catch (err) {
    console.error("Error reading the file:", err);
  }
}

processFile();
