export const comparePricesPercent = (oldPrice, newPrice) => {
  if (typeof oldPrice !== "number" || typeof newPrice !== "number") {
    return null;
  }

  const discountPercent = Math.floor(((oldPrice - newPrice) / oldPrice) * 100);

  if (discountPercent < 0) {
    return Math.abs(discountPercent);
  } else {
    return -discountPercent;
  }
};
