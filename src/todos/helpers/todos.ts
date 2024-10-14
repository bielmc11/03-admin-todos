//Instrucciones para llegar como si fuese postmamn

import { Todo } from "@prisma/client";

export const changeTodosStatus = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const myBody = { complete };

  const result = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(myBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();

  console.log(data);
  return data;
};

type MiType = {
  mesage: Todo[];
};
export const selectAllTodos = async (): Promise<MiType | void> => {
  try {
    const result = await fetch(`http://localhost:3000/api/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.json();
  } catch (error) {
    console.log(error);
  }
};


export const createTodo = async (
  description: string,
): Promise<Todo> => {
  const body = {description};

  const result = await fetch(`http://localhost:3000/api/todos`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();

  console.log(data);
  return data;
};

