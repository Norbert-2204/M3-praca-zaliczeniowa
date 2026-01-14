function generateOrderNumber() {
  const prefix = "INV";
  const ts = Date.now();
  const code = "TSR";
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();

  return `${prefix}/${ts}/${code}/${randomPart}`;
}
export default generateOrderNumber;
