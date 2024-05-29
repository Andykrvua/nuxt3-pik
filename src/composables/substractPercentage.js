export const subtractPercentage = (number, percentage) => {
  if (typeof number !== "number" || typeof percentage !== "number") {
    return null;
  }

  let result = number - (number * percentage) / 100;
  result = Math.round(result * 100) / 100;
  result = result.toFixed(2).replace(/\.?0+$/, "");

  return result;
};
