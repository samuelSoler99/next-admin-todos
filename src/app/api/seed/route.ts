import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs';

export async function GET() {
    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data:{
            email: 'test1@gmail.com',
            password: bcrypt.hashSync('123456'),
            roles: ['admin','client','super-user'],
            todos: {
                create: [
                    { description: 'Terminar curso de Astro', },
                    { description: 'Terminar curso de Next', complete: true },
                    { description: 'Terminar curso de Nuxt', },
                    { description: 'Terminar curso de Angular', }
                ]
            }
        }
    })

    return Response.json({ message: 'Seed Executed' })
}