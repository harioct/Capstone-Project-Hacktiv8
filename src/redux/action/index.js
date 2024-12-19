export const addCart = (product) => {
    return {
        type : 'ADD_TO_CART',
        payload : product
    }
}

export const removeCart = (product) => {
    return {
        type : 'REMOVE_FROM_CART',
        payload : product
    }
}

export const emptyCart = () => {
    return {
      type: "EMPTY_CART",
    }
}

export const checkoutCart = () => {
    return {
      type: "CHECKOUT_CART",
    }
}  
