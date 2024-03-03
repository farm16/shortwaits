export const getUserGreeting = ({ morningMessage = "Good morning", afternoonMessage = "Good afternoon", eveningMessage = "Good evening" }) => {
  const currentHour = new Date().getHours();
  console.log("currentHour >>>", currentHour);
  if (currentHour > 3 && currentHour < 12) {
    return morningMessage;
  }
  if (currentHour > 12 && currentHour < 18) {
    return afternoonMessage;
  }
  return eveningMessage;
};
