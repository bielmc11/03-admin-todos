import { Todo } from '@prisma/client'
import React from 'react'
import { TodoItem } from './TodoItem'


interface Props{
    todos?: Todo[]
}
export const TodosGrid = ({todos = [] } : Props) => {


  return (
    <div className='grid grid-cols-1 sm grid-cols-3-'>
        {
            todos.map(todo => {
                return <TodoItem key={todo.id} {...todo} />
            })
        }
    </div>
  )
}
