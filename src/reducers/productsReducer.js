import types from "./types";

const initialProducts = {
  products: [
    { id: 1, title: "producto#1" },
    { id: 2, title: "producto#2" },
    { id: 3, title: "producto#3" },
    { id: 4, title: "producto#4" },
  ],
  cart: [
    { id: 1, title: "producto#1", quantity: 0 },
    { id: 2, title: "producto#2", quantity: 0 },
  ],
  enStock: { id: 4, title: "producto#4" },
};

const productReducer = (state, action) => {
  switch (action.type) {
    case types.productShow:
      return { ...state, enStock: action.payload };
    case types.productAddToCart: {
      const newProduct = action.payload;
      const cartContainProduct = state.cart.find((p) => p.id === newProduct.id);
      //tengo que comprobar si el newProduct que agrego al cart ya estab o no previamente en el mismo
      return cartContainProduct
      //primer caso: si ya exisitan previamente solo aumento la cantiadad en uno
        ? {
            ...state,
            cart: state.cart.map((p) => (p.id === newProduct.id ? { ...p, quantity: p.quantity + 1 } : p)),
          }
          //aca el action.payload seria el objeto de forma { id: 1, title: "producto#1", quantity: 0 },
        : {
            ...state,
            cart: [...state.cart, { ...action.payload, quantity: 1 }],
          };
    }
    case types.productRemoveOneFromCart:{
      const productToRemove = state.cart.find(p => p.id ===action.payload)
      
      return productToRemove.quantity > 1 

      ? {
        ...state, 
        cart : state.cart.map( p => p.id===action.payload ? {...p, quantity:quantity-1}: p)
      }
      : {
        ...state,
        cart: state.cart.filter( p => p.id!==action.payload )
      }
      

    }

    case types.productRemoveFromCart:
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload),
      };

    default:
      return state;
  }
};
export { initialProducts };
export default productReducer;
