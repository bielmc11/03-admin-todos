import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { Segment } from "next/dist/server/app-render/types";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({ where: { id } });

  return todo;
};

export async function GET(request: NextRequest, segment: Segment) {
  const { params } = segment;

  //Hay que validar errores por si no existe
  const myTodo = await prisma.todo.findUnique({
    where: { id: params.id },
  });

  if (!myTodo) {
    return NextResponse.json({
      message: "No existe el todo",
      status: 404,
    });
  }

  return NextResponse.json({ message: myTodo }, { status: 200 });
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(req: NextRequest, segment: Segment) {
  try {
    const params = segment.params.id;
    const todo = await getTodo(params);

    if (!todo) {
      return NextResponse.json(
        { message: `No existe todo con id ${params}` },
        { status: 404 }
      );
    }

    const { description, complete } = await putSchema.validate(
      await req.json()
    );

    const todoPosted = await prisma.todo.update({
      where: {
        id: params,
      },
      data: {
        description,
        complete,
      },
    });
    return NextResponse.json({
      message: todoPosted,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
