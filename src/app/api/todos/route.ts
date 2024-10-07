import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryLimit = searchParams.get("limit");
  const querySkip = searchParams.get("skip");

  const take = queryLimit ?? "10";
  const skip = querySkip ?? "0";

  //tendria que lanzar errores por si mando letras a la url
  if(isNaN(parseInt(take))){
    return NextResponse.json({message: 'limit must be a number'}, {status: 400})
  }
  if(isNaN(parseInt(skip))){
    return NextResponse.json({message: 'skip must be a number'}, {status: 400})
  }

  const todos = await prisma.todo.findMany({
    take: parseInt(take),
    skip: parseInt(skip),

  });
  return NextResponse.json({ mesage: todos }, { status: 200 });
}