import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server'

export async function GET() {

    //Limpio mi base de datos antes
    await prisma.todo.deleteMany() //podria poner where pero quiero borrar todos

    //Aqui tendria que añadir datos
    await prisma.todo.createMany({
        data: [
            {description: 'piedra del alma', complete: true},
            {description: 'piedra del poder'},
            {description: 'piedra del tiempo'},
            {description: 'piedra del espacio'},
            {description: 'piedra de la realidad'}
        ]
    })

  return NextResponse.json({ message: 'Seed executed' }, { status: 200 } );
}