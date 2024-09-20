/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import React from "react";

const TodoItem = ({ item, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center my-3 gap-3 shadow-lg p-5 bg-gray-200 rounded-full">
      <div
        onClick={() => {
          toggle(id);
        }}
        className="flex flex-1 items-center cursor-pointer "
      >
        {isComplete ? (
          <IoCheckmarkDoneSharp fontSize={30} className="text-green-700" />
        ) : (
          <FaRegCircle fontSize={30} className="text-green-700" />
        )}

        <p
          className={`text-slate-700 ml-4 text-lg capitalize decoration-slate-500 ${
            isComplete ? "line-through" : ""
          }`}
        >
          {item}
        </p>
      </div>
      
        <MdDeleteForever
          fontSize={30}
          className="text-red-500"
          onClick={() => {
            deleteTodo(id);
          }}
        />
    </div>
  );
};

export default TodoItem;
