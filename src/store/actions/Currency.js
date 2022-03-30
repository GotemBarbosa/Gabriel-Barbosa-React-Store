export function changeCurrency(currency, symbol) {
  return {
    type: "CHANGE_CURRENCY",
    currency,
    symbol,
  };
}
