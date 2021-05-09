import React, { useReducer, useState } from "react";

const DELETE = "DELETE";
const CREATE = "CREATE";
const UPDATE = "UPDATE";

const initialTodos = [
  { id: 1, title: "Todo #10" },
  { id: 2, title: "Todo #11" },
  { id: 3, title: "Todo #12" },
  { id: 4, title: "Todo #13" },
  { id: 5, title: "Todo #14" },
];
const todosReducer = (state, action) => {
  switch (action.type) {
    case DELETE:
      return state.filter((todo) => todo.id !== action.payload);
    case CREATE:
      return [...state, action.payload]; //hago una copia anterior del state y agrego el nuevo elemento creado que me llega a traves de action.payload

    case UPDATE: {
        const todoEditado = action.payload;
        return state.map(todo => todo.id === todoEditado.id ? todoEditado : todo )
    }
        
    default:
      return state;
  }
};

const TodoApp = () => {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = { id: new Date(), title: text };
    //el title va a ser el estado local del input con el hook de useState
    //armo desde aca el objeto que le voy a mandar al reducer
    //el reducer lo va a recibir como action.payload

    dispatch({ type: CREATE, payload: newTodo });
    setText("")
  };

  return (
    <div>
      <h2>todo app</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => dispatch({ type: DELETE, payload: todo.id })}>Delete</button>
            <button onClick={() => dispatch({ type: UPDATE, payload: { ...todo, title: text } })}>Update</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input placeholder='ingresar todo'value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={handleSubmit}>Create todo</button>
      </form>
    </div>
  );
};

export default TodoApp;
