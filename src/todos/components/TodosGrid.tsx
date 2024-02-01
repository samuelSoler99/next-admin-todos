'use client'
import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem";

// import * as todosApi from '@/todos/helpers/todos';
// import { useRouter } from "next/navigation";
import { toggleTodo } from "../actions/todo-actions";

interface Props {
    todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {

    // ejemplo de como usar endpoint tradicion y no un server action, lo ideal es que el componente padre mandara a este 
    // const router = useRouter();
    // const toggleTodo = async (id: string, complete: boolean) => {
    //     await todosApi.updateTodo(id, complete);
    //     router.refresh();
    // }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {
                todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
                ))
            }
        </div>
    )
}
