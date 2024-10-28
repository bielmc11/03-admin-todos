export const dynamic = "force-dynamic";
export const revalidate = 0;

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Listado de todos",
  description: "Seo title",
};
export default async function ServerAcionsPage() {
  const session = await auth(); //Esto lo puedo poner en un helper
  //Al hacer esto el loader puede ser un componente loanding a la altura de page
  if (!session) {
    redirect("/api/auth/signin");
  }

  const awaitTodos = await prisma.todo.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: { description: "asc" },
  });

  console.log("construido000000000000000000");
  return (
    <>
      <span className="text-3xl mb-10">SERVER ACIONS</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={awaitTodos} />
    </>
  );
}
