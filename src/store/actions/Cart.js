
export function addToCart(product){
    return{
        type: "ADD_TO_CART",
        product
    }
}
export function updateCartQuantity(cartItemId,newQuantity){
    return{
        type: "UPDATE_QUANTITY",
        cartItemId,
        newQuantity   
    }
}
