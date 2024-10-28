import prisma from '@/lib/prisma';
import bCrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function GET() {

    //Limpio mi base de datos antes
    await prisma.todo.deleteMany() //podria poner where pero quiero borrar todos
    await prisma.user.deleteMany()

    //Aqui tendria que añadir datos
    await prisma.user.create({
        data: {
            name: 'usuraio prueba 1',
            email: 'usuraio@gmail.com',
            password: bCrypt.hashSync('123456'),
            roles: ['admin', 'client', 'super-user'],
            image: 'https://avatars.githubusercontent.com/u/123456?v=4',
            todos: {
                create: [
                    {description: 'piedra del alma', complete: true},
                    {description: 'piedra del poder'},
                    {description: 'piedra del tiempo'},
                    {description: 'piedra del espacio'},
                    {description: 'piedra de la realidad'}
                ]
            }
        }
    })


  return NextResponse.json({ message: 'Seed executed' }, { status: 200 } );
}