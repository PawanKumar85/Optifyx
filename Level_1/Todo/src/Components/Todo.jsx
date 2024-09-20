/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";

import { RiCalendarTodoFill } from "react-icons/ri";
import TodoItem from "./TodoItem";
import { json } from "react-router-dom";

const Todo = () => {
  const [todo, setTodo] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")): []);
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") return null;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodo((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodo((prev) => {
      return prev.filter((todo) => todo.id != id);
    });
  };

  const toggle = (id) => {
    setTodo((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) return { ...todo, isComplete: !todo.isComplete };
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todo));
  }, [todo]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-lg shadow-lg">
      <div className="flex items-center mt-7 gap-3 justify-center">
        <RiCalendarTodoFill fontSize={30} />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      <div className="flex items-center my-7 bg-gray-200 rounded-full shadow-xl">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add Your Task"
        />
        <button
          className="border-none rounded-full bg-green-700 w-32 h-14 text-white text-lg font-medium cursor-pointer"
          onClick={add}
        >
          Add+
        </button>
      </div>

      <div>
        {todo.map((item, index) => {
          return (
            <TodoItem
              key={index}
              item={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
