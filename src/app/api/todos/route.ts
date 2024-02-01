import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma"
import * as yup from 'yup';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const take = Number(searchParams.get('take') ?? '10');
    const skip = Number(searchParams.get('skip') ?? '0');

    if (isNaN(take)) {
        return Response.json({ code: '500', meesage: 'El parametro take ha de ser number' }, { status: 400 })
    }
    if (isNaN(skip)) {
        return Response.json({ code: '500', meesage: 'El parametro skip ha de ser number' }, { status: 400 })
    }

    const todos = await prisma.todo.findMany({
        skip: skip,
        take: take,
    })

    return Response.json({ todoas: todos }, { status: 200 })
}

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),

})

export async function POST(request: Request) {
    const user = await getUserSessionServer();
    if (!user) {
        return Response.json('No autorizado', { status: 401 })
    }

    try {
        const { complete, description } = await postSchema.validate(await request.json());

        const todo = await prisma.todo.create({ data: { complete, description, userId: user.id } })

        return Response.json(todo, { status: 200 })
    } catch (error) {
        return Response.json(error, { status: 400 });
    }
}

export async function DELETE() {
    const user = await getUserSessionServer();
    if (!user) {
        return Response.json('No autorizado', { status: 401 })
    }

    try {
        const todo = await prisma.todo.deleteMany({ where: { complete: true, userId: user.id } })
        return Response.json(todo, { status: 200 })
    } catch (error) {
        return Response.json(error, { status: 400 });
    }
}