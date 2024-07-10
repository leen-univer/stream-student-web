export const convertedDateFunc = (time: any) => {
  const classDate = new Date(time).getDate();
  const formattedClassDate = String(classDate).padStart(2, "0");
  const classMonth = new Date(time).getMonth() + 1;
  const formattedClassMonth = String(classMonth).padStart(2, "0");
  const classYear = new Date(time).getFullYear();
  const formattedClassYear = String(classYear).padStart(2, "0");
  const dateHour = new Date(time).getHours();
  const formattedHour = String(dateHour).padStart(2, "0");
  const dateMinute = new Date(time).getMinutes();
  const formattedMinute = String(dateMinute).padStart(2, "0");
  const convertedDate = `${formattedClassYear}-${formattedClassMonth}-${formattedClassDate}T${formattedHour}:${formattedMinute}`;

  return convertedDate;
};
