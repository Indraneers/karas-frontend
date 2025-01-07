export function isValidVariableQty(text: string) {
  const regex = /^-?(\d+(\.\d{0,3})?|\.)?$|^$/;
  return regex.test(text);
}