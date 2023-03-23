import { redirect } from "@remix-run/node";
import { Form, NavLink, Outlet, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { createProject, getProjects } from "~/models/project.server";
import { badRequest, validateProject } from "~/utils/utils";

export async function loader() {
    const projects = await getProjects();

    // console.log({ projects });

    return projects;
}

export async function action({ request }) {
    const formData = await request.formData();
    const projectTitle = formData.get('projectTitle');

    const fieldError = {
        projectTitle: validateProject(projectTitle)
    };

    if (Object.values(fieldError).some(Boolean)) {
        return badRequest({ fieldError });
    }
    const project = await createProject(projectTitle);
    const id = project.id;

    return redirect(`/projects/${id}`);
}

export default function Projects() {
    const data = useLoaderData();
    // console.log({ data });

    const actionData = useActionData();
    const navigation = useNavigation();

    const formRef = useRef(null);

    useEffect(() => {
        if (navigation.state === 'submitting') {
            formRef.current?.reset();
        }
    }, [navigation.state]);

    return (
        <main className="flex gap-10 divide-x-2 min-h-screen">
            <div className="pl-8 w-80">
                {data.length > 0
                    ? (<ul className="mt-6 w-full">
                        {data.map(project => (
                            <li key={project.id} className="py-2 w-full">
                                <NavLink to={`/projects/${project.id}`} className={({ isActive }) => isActive ? 'bg-white py-2 px-4 rounded flex justify-between w-full' : 'py-2 px-4 hover:bg-gray-200 flex justify-between w-full'}>{project.title}
                                    <small className="bg-[#dfdedf] p-1 rounded">{`${project.tasks.filter(task => task.complete === true).length} / ${project.tasks.length}`}</small>
                                </NavLink>

                            </li>
                        ))}
                    </ul>)
                    : <p className="mt-6 text-gray-400">No items yet</p>}

                <Form method="post" className="flex gap-2 mt-10" ref={formRef}>
                    <input
                        type="text"
                        placeholder="Project title"
                        name="projectTitle"
                        aria-label="project-title"
                        className="rounded px-3 py-2 bg-[#dfdedf] focus:outline-green-500"
                    />
                    <button
                        type="submit"
                        name="_action"
                        value="add"
                        className="bg-green-500 text-white px-6 py-2 rounded">{(navigation.state === 'submitting') && navigation.formData.get('_action') === 'add' ? 'Adding...' : 'Add'}
                    </button>
                </Form>
                {actionData
                    ? <div className="text-red-500">{actionData?.fieldError?.projectTitle}</div>
                    : <>&nbsp;</>
                }

            </div>
            <div className="mt-6 pl-8">
                <Outlet />
            </div>
        </main>
    );
}