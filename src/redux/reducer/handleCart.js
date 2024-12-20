const cart = [];

const handleCart = (state = cart, action) => {
    const product = action.payload;
    switch (action.type) {
        case 'ADD_TO_CART':
            const exist = state.find((x) => x.id === product.id);
            if (exist) {
                if (product.stock > exist.qty) {
                    return state.map((x) =>
                        x.id === product.id ? { ...x, qty: x.qty + 1 } : x
                    );
                } else {
                    return state;
                    }
            } else {
                if (product.stock > 0) {
                return [...state, { ...product, qty: 1 }];
                } else {
                return state;
                }
            }

        case 'REMOVE_FROM_CART':
            const item1 = state.find((x) => x.id === product.id);
            if (item1.qty === 1) {
                return state.filter((x) => x.id !== item1.id);
            } else {
                return state.map((x) => x.id === product.id ? {...x, qty: x.qty - 1} : x);
            }

        case "CHECKOUT_CART":
            return state.map((item) => ({
                ...item,
                stock: item.stock - item.qty,
            }));

        case "EMPTY_CART":
            return [];

        default:
            return state;
    }
}

export default handleCart;