//Instrucciones para llegar como si fuese postmamn

import { Todo } from "@prisma/client"

export const changeTodosStatus = async (id: string, complete: boolean) : Promise<Todo> => {
    const myBody = { complete }

    const result = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(myBody),
        headers: {
            'Content-Type': 'application/json'
        }
    } )
    const data = await result.json()

    console.log('La data añadida a la llamada es: ',data)
    return data
}