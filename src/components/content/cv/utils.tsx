import i18n from "i18n";

export const cvDateFormatter = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString(i18n.language, {
    month: "long",
    year: "numeric",
  });
};
