"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

const sleep = (secs: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, secs * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
    await sleep(3)
  const todo = await prisma.todo.findFirst({
    where: {
      id,
    },
  });

  if (!todo) {
    throw new Error("No existe el todo");
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-actions");

  return updatedTodo;
};

export const addTodo = async (description: string) => {
  try {
    const session = await auth()
    const todo = await prisma.todo.create({ data: { description, userId: session?.user.id ?? '' } });
    revalidatePath("/dashboard/server-actions");
    return todo;
  } catch (error) {
    return {
      message: "Error creando todo",
    };
  }
};

export const deleteCompleted = async () => {
  try {
    const session = await auth()
    await prisma.todo.deleteMany({
      where: { complete: true, userId: session?.user.id ?? '' },
    });
    revalidatePath("/dashboard/server-actions");
  } catch (error) {
    return "ha ocurrido un error";
  }
};
