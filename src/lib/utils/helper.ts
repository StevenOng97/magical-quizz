export const formatDate = (timestamp?: string) => {
  if (!timestamp) return "N/A";
  const dateObject = new Date(Number(timestamp) * 1000);
  const day = String(dateObject.getUTCDate()).padStart(2, "0");
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
  const year = dateObject.getUTCFullYear();
  return `${day}-${month}-${year}`;
};

export function roundIfNumber(value: string | number | null) {
  if (typeof value === "number") {
    return parseFloat(value.toFixed(2));
  } else if (typeof value === "string") {
    const num = parseFloat(value);
    const rounded = parseFloat(num.toFixed(2));
    return rounded;
  }
  return value;
}

export function convertDateToString(date: Date): string {
  const timestampDate = new Date(date);
  const year = timestampDate.getFullYear();
  const month = timestampDate.getMonth() + 1;
  const day = timestampDate.getDate();

  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
}

export const PRICE_ID: string = "price_1P3ONOC0XQCoR9va7yUrQwNx";
