import prisma from "@/lib/prisma";
import { Segment } from "next/dist/server/app-render/types";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, segment: Segment) {
  const { params } = segment;

  //Hay que validar errores por si no existe
  const myTodo = await prisma.todo.findUnique({
    where: { id: params.id },
  });

  console.log(request.nextUrl.searchParams);
  if (!myTodo) {
    return NextResponse.json({
      message: "No existe el todo",
      status: 404,
    });
  }

  return NextResponse.json({ message: myTodo }, { status: 200 });
}

