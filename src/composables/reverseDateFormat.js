export const reverseDateFormat = (dateString) => {
  const parts = dateString?.split("-");

  if (!parts) return;
  const newDateString = `${parts[2]}.${parts[1]}.${parts[0]}`;

  return newDateString;
};
