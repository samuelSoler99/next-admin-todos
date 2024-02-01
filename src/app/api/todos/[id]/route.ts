import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client";
import * as yup from 'yup';

interface Segments {
    params: {
        id: string;
    }
}

const getTodo = async (id: string): Promise<Todo | null> => {

    const user = await getUserSessionServer();
    if (!user) {
        return null
    }

    try {
        const todo = await prisma.todo.findFirstOrThrow({
            where: { id: id }
        })

        if (todo?.userId === user.id) {
            return null
        }

        return todo;
    } catch (error) {
        throw error
    }
}

export async function GET(request: Request, { params }: Segments) {
    const { id } = params;
    try {
        const todo = await getTodo(id);
        return Response.json({ todo: todo }, { status: 200 })
    } catch (error) {
        return Response.json({ message: 'todo con ' + id + ' no encontrado' }, { status: 404 })
    }
}

const putSchema = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional().default(false),

})
export async function PUT(request: Request, { params }: Segments) {
    const { id } = params;
    try {
        const todo = await getTodo(id);
    } catch (error) {
        return Response.json({ message: 'todo con ' + params.id + ' no encontrado' }, { status: 500 })
    }

    try {
        const { complete, description } = await putSchema.validate(await request.json());

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: { complete, description }
        })

        return Response.json({ updatedTodo: updatedTodo }, { status: 200 })
    } catch (error) {
        return Response.json(error, { status: 500 })
    }


}