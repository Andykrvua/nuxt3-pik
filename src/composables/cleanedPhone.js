export const cleanedPhone = (phoneNumber) => {
  return "+" + phoneNumber?.replace(/\D/g, "");
};
