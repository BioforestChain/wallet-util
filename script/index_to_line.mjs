/**
 *
 * @param {string} fileContent
 * @param {number} index
 */
export const indexToLine = (fileContent, index) => {
  let walk = 0;
  for (const [lineIndex, line] of fileContent.split('\n').entries()) {
    walk += line.length + 1;
    if (walk >= index) {
      return {
        line: lineIndex + 1,
        col: index + 1 - (walk - line.length - 1),
        lineContent: line,
      };
    }
  }
  return {
    line: 0,
    col: 0,
    lineContent: '',
  };
};
