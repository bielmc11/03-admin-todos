import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Listado de todos",
  description: "Seo title",
};
export default async function RestTodosPage() {
  //Al hacer esto el loader puede ser un componente loanding a la altura de page
  const awaitTodos = await prisma.todo.findMany({
    orderBy: { description: "asc" },
  });
  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={awaitTodos} />
    </div>
  );
}
