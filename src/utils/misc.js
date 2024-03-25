export function reverse(s) {
  return s.split("").reverse().join("");
}

export const convertDate = (info) => {
  const tempDate = new Date(info);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return tempDate.toLocaleDateString("en", options);
};
