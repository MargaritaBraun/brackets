module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const open = bracketsConfig.map(pair => pair[0]);
  const close = bracketsConfig.map(pair => pair[1]);
  const matchingPairs = {};

  for (const pair of bracketsConfig) {
    const [openingBracket, closingBracket] = pair;
    matchingPairs[closingBracket] = openingBracket;
  }

  for (let i = 0; i < str.length; i++) {
    const currentChar = str[i];

    if (open.includes(currentChar)) {
      if (currentChar === matchingPairs[currentChar] && stack[stack.length - 1] === currentChar) {
        stack.pop();
      } else {
        stack.push(currentChar);
      }
    } else if (close.includes(currentChar)) {
      const lastItem = stack.pop();
      if (!lastItem || lastItem !== matchingPairs[currentChar]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
