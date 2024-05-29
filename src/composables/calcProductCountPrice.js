export const calcProductCountPrice = (price, count) => {
  if (typeof price !== "number" || typeof count !== "number") {
    return null;
  }

  const result = price * count;

  const roundedResult = Math.round(result * 100) / 100;

  if (Number.isInteger(roundedResult)) {
    return roundedResult.toLocaleString("ru-RU");
  }

  const formattedResult = roundedResult.toLocaleString("ru-RU", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });

  return formattedResult.replace(",", ".");
};
