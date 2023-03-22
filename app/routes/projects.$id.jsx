import { redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { getProjectById } from "~/models/project.server"
import { createTask, updateTask } from "~/models/task.server";

export async function loader({ params }) {
    const projectId = params.id;
    const project = await getProjectById(projectId);

    // console.log({ project });

    return project;
}

export async function action({ request, params }) {
    const projectId = params.id;
    const formData = await request.formData();

    console.log('Checked!');

    // return null;

    if (request.method.toLowerCase() === 'put') {
        // const completed = formData.get('completed');
        // const id = formData.get('id');
        // console.log({ completed });

        // await updateTask(Number(id), JSON.parse(completed));
        console.log('Complete');
        return null;
    }
    else if (request.method.toLowerCase() === 'post') {
        const newTask = formData.get('newTask');
        await createTask(newTask, projectId);
    }

    return redirect(`/projects/${projectId}`);
}

export default function Project() {
    const data = useLoaderData();
    const submit = useSubmit();
    const navigation = useNavigation();

    const formRef = useRef(null);

    // function handleChange(event, id) {
    //     submit({ complete: String(event.target.checked), id: String(id) }, { method: "put", replace: true });
    // }

    useEffect(() => {
        if (navigation.state === 'submitting') {
            formRef.current?.reset();
        }
    }, [navigation.state]);

    return (
        <div>
            <h1 className="text-3xl font-semibold">{data.title}</h1>

            {data.tasks.length > 0
                ? (
                    <ul className="mt-4">
                        {data.tasks.map(task => (
                            <li key={task.id}>
                                <input
                                    type="checkbox"
                                    id={task.id}
                                    // name="completed"
                                    // checked={task.complete}
                                    // onChange={(event) => handleChange(event, task.id)}
                                    onChange={(event) => submit(
                                        { complete: String(event.target.checked), id: String(id) },
                                        { method: "put", replace: true })
                                    }
                                    className="inline mr-1"
                                />
                                <label htmlFor={task.id}>{task.title}</label>
                            </li>
                        ))
                        }
                        {(navigation.formData) &&
                            <li>
                                <input
                                    type="checkbox"
                                    disabled
                                    id="optimistic"
                                    className="inline mr-1"
                                />
                                <label htmlFor="optimistic">{navigation.formData?.get('newTask')}</label>
                            </li>
                        }

                    </ul>
                )
                : <p className="mt-6 text-gray-400">No tasks yet</p>}

            <Form method="post" ref={formRef}>
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
    );
}