import React from "react";

interface Props  {
  id: string
  description: string
  complete: boolean
  createdAt: Date
  updatedAt: Date
};

export const TodoItem = ({ id, description, complete, createdAt, updatedAt }: Props) => {
  return <div>TodoItem {description}</div>;
};
