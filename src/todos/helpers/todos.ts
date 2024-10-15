//Instrucciones para llegar como si fuese postmamn

import { Todo } from "@prisma/client";

//Cambiar el complete
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
  return data;
};

type MiType = {
  mesage: Todo[];
};
//Obtener todos los todos
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

//Crear nuevo todo
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


//Eliminar los todos completados
export const deleteCompletedTodos = async(): Promise<string> => {
  try{
    const result = await fetch('http://localhost:3000/api/todos',{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return 'eliminacion compeltada'
  } catch (error) {
    console.log(error)
    return 'ha ocurrido un error'
  }
}
