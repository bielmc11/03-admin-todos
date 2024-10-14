"use client";
import { Todo } from "@prisma/client";
import React, { useState } from "react";
import { TodoItem } from "./TodoItem";
import * as api from "../helpers/todos";
import { useRouter } from "next/navigation";

interface Props {
  todos?: Todo[];
}


export const TodosGrid = ({ todos = [] }: Props) => {
  const [misTodos, setMisTodos] = useState<Todo[]>(todos);

  //console.log(misTodos);
const router = useRouter()
  const toggleTodo = async (
    id: string,
    complete: boolean
  ): Promise<Todo[] | void> => {
   await api.changeTodosStatus(id, complete);
    //const newTodos = await api.selectAllTodos();

   /*  if (newTodos !== undefined) {
      setMisTodos(newTodos.mesage);
    } */
    router.refresh()

  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => {
        return <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />;
      })}

    </div>
  );
};
