import { format } from "date-fns";

export const formatDate = (date: Date) => {
  let month: number | string;
  let day: number | string;

  let year = date.getFullYear().toString();

  month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month.toString();
  }

  day = date.getDate();
  if (day < 10) {
    day = "0" + day.toString();
  }

  return year + "-" + month + "-" + day;
};
