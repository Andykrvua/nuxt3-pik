export const formattedDate = (dateString) => {
  const ISO8601_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$/;

  if (!ISO8601_REGEX.test(dateString)) {
    return {
      dateEn: null,
      dateUa: null,
    };
  }

  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDateEn = `${year}-${month}-${day}`;
  const formattedDateUa = `${day}.${month}.${year}`;

  return {
    dateEn: formattedDateEn,
    dateUa: formattedDateUa,
  };
};
