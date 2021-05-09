import React, { useReducer } from "react";
import productReducer, { initialProducts } from "../reducers/productsReducer";
import types from "../reducers/types";

const ProductApp = () => {
  const [productState, dispatch] = useReducer(productReducer, initialProducts);

  const { products, cart, enStock } = productState;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((prod) => (
          <li key={prod.id}>
            {prod.title} 
            <button onClick={()=>dispatch({type: types.productShow, payload: prod})}>Show Product</button>
            <button onClick={()=>dispatch({type: types.productAddToCart, payload: prod})}> Add to cart</button>
          </li>
        ))}
      </ul>

      <h2>Carrito</h2>
      <ul>
        {cart.map((prod) => (
          <li key={prod.id}>
            {prod.title} -quantity: {prod.quantity}
            <button onClick={()=>dispatch({type:types.productRemoveOneFromCart, payload: prod.id})}>remove one from cart</button>
          </li>
        ))}
      </ul>
        <button onClick={()=>dispatch({type:types.productRemoveFromCart, payload: prod.id})}>remove all from cart</button>

      <h2>Preview</h2>
      <p>{enStock.title}</p>
    </div>
  );
};

export default ProductApp;
