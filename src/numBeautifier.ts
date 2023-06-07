/*
 ** Example: 36550 -> 36 550
 */
export function numBeautifier(num: number): string {
  let modNum = "";
  let count = 0;

  num
    .toString()
    .split("")
    .reverse()
    .forEach((item) => {
      if (count % 3 == 0) {
        modNum += " " + item;
      } else {
        modNum += item;
      }
      count++;
    });

  return modNum.split("").reverse().join("");
}

/*
 ** Example: [1, 5, 2, 1] -> [1, 5, 2]
 */
export const getRidOfDuplicates = (arry: number[]) =>
  arry.filter((item: number, index: number) => arry.indexOf(item) === index);
