import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("hola mundo");
}

export async function POST(req: Request) {
  const title = "Deberia pillarlo del req";

  return NextResponse.json({ title: { title } }, { status: 201 });
}
