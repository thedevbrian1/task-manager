import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getProjectById } from "~/models/project.server"
import { createTask } from "~/models/task.server";

export async function loader({ params }) {
    const projectId = params.id;
    const project = await getProjectById(projectId);

    // console.log({ project });

    return project;
}

export async function action({ request, params }) {
    const projectId = params.id;
    const formData = await request.formData();
    const newTask = formData.get('newTask');
    await createTask(newTask, projectId);

    return redirect(`/projects/${projectId}`);
}

export default function Project() {
    const data = useLoaderData();

    return (
        <div>
            <h1 className="text-3xl font-semibold">{data.title}</h1>
            <ul className="mt-4">
                {data.task.map(task => (
                    <li key={task.id}><input type="checkbox" className="inline mr-1" /> {task.title}</li>
                ))
                }
            </ul>
            <Form method="post">
                <input type="checkbox" disabled />
                <input
                    type="text"
                    name="newTask"
                    aria-label="new-task"
                    placeholder="New task"
                    className="appearance-none bg-transparent border-b border-black focus:outline-none focus:border-green-500 py-2 px-3 mt-3"
                />
            </Form>
        </div>
    )
}