import React, { useReducer } from "react";

const INCREMENT = 'increment'
const DECREMENT = 'decrement'
const RESET = 'reset'

const counterReducer = (state, action) => {
  //funcion pura en realidad recibe el prevState y retorna un noNewState
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    case RESET:
      return 0;
    default:
      return init(initialState);
      //si llamo a una accion que no existe simplemente el reducer retorna el valor que ya tenia!
  }
  //necessariamente debo tener el  case default que retorne el state pues sino el state se pierde!!
  //el valor del hook REducer queda como undefined la consola!!

};
const initialState = 10.25;

const init = (value) => {
//es un mutador del estado inicial si es que necesito inicialmente mutar el valor inicial del contador 
  return parseInt(value)
  //va a empezar en el parte entera
}

const Counter = () => {
  const [counter, dispatch] = useReducer(counterReducer, initialState, init);
  //reducer es una funcion pura
  //el dispatch recibe siempre un action
  //el action no es mas que un objeto con atributos type y payload

  return (
    <div>
      <h1>Clikcs: {counter}</h1>
      <button onClick={() => dispatch({ type: INCREMENT })}>Increment</button>
      <button onClick={() => dispatch({ type: DECREMENT })}>Decrement</button>
      <button onClick={() => dispatch({ type: RESET })}>Reset</button>
    </div>
  );
};

export default Counter;
