export const CURR_YEAR_STRING = new Date().getFullYear().toString();

export const yearMap = (year: string): string => {
  switch (year) {
    case CURR_YEAR_STRING:
      return "this year";
    case "2017":
      return "possibly in 2017";
    case "2016":
      return "possibly in 2016";
    default:
      return year;
  }
};
