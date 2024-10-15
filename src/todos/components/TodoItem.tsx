"use client";
import React, { startTransition, useOptimistic } from "react";
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
  const [ todoOptimistic, toggleTodoOptimistic ] = useOptimistic(
    { description, complete, createdAt, updatedAt, id },
    (state, newCompletedValue: boolean) => ({ ...state, complete: newCompletedValue })
  );

  //En esta funcion primero actualizo la UI con el hook, luego llamo a la BD, si ocurre un error hago un rollBack en el catch
  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete)); //esto visualmente hará el cambio
      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete); //Cambio la BD
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete)); //Aqui me encargo de devolver la accion a su estado inicial si ha ocurrido un error
    }
  };

  return (
    <div
      className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          /* onClick={() => {
            //toggleTodo(todoOptimistic.id, !todoOptimistic.complete);
            onToggleTodo()
          }} */
          onClick={onToggleTodo}
        >
          <div
            className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
              todoOptimistic.complete ? "bg-blue-100" : ""
            }`}
          >
            {todoOptimistic.complete ? (
              <IoCheckboxOutline size={30} />
            ) : (
              <IoSquareOutline size={30} />
            )}
          </div>
        </div>

        <div className="text-center sm:text-left">
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  );
};
