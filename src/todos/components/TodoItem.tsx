"use client";
import React from "react";
import styles from "./todoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { Todo } from "@prisma/client";

interface Props {
  id: string;
  description: string;
  complete: boolean;
  createdAt: Date;
  updatedAt: Date;

  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}



//Igual update no se lo tengo que pasar como prop sino que llamarlo direcamente aqui
export const TodoItem = ({
  id,
  description,
  complete,
  createdAt,
  updatedAt,
  toggleTodo,
}: Props) => {
  return (
    <div className={complete ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          onClick={() => {
            toggleTodo(id, !complete);
          }}
        >
        <div
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
            complete ? "bg-blue-100" : ""
          }`}
        >
            {complete ? (
              <IoCheckboxOutline size={30} />
            ) : (
              <IoSquareOutline size={30} />
            )}
          </div>
        </div>

        <div className="text-center sm:text-left">{description}</div>
      </div>
    </div>
  );
};
