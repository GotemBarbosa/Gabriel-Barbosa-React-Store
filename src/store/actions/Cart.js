export function addToCart(product) {
  return {
    type: "ADD_TO_CART",
    product,
  };
}
export function updateCartQuantity(cartItemId, newQuantity) {
  return {
    type: "UPDATE_QUANTITY",
    cartItemId,
    newQuantity,
  };
}
export function deleteInCart(cartItem) {
  return {
    type: "DELETE_IN_CART",
    cartItem,
  };
}
