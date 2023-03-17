import { redirect } from "@remix-run/node";
import { Form, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { createProject, getProjects } from "~/models/project.server";

export async function loader() {
    const projects = await getProjects();

    // console.log({ projects });

    return projects;
}

export async function action({ request }) {
    const formData = await request.formData();
    const projectTitle = formData.get('projectTitle');
    await createProject(projectTitle);

    return redirect('/projects');
}

export default function Projects() {
    const data = useLoaderData();

    return (
        <main className="flex gap-10 divide-x-2 min-h-screen">
            <div className="pl-8 max-w-sm">
                <ul className="mt-6 w-full">
                    {data.map(project => (
                        <li key={project.id} className="py-2 w-full">
                            {/* <NavLink to={`/projects/${project.id}`} className={`hover:bg-gray-200 py-2 rounded ${({ isActive }) => isActive ? 'bg-white' : ''}`}>{project.title}
                            </NavLink> */}
                            <NavLink to={`/projects/${project.id}`} className={({ isActive }) => isActive ? 'bg-white py-2 px-4 rounded' : 'py-2 px-4 hover:bg-gray-200'}>{project.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <Form method="post" className="flex gap-2 mt-10">
                    <input
                        type="text"
                        placeholder="Project title"
                        name="projectTitle"
                        aria-label="project-title"
                        className="rounded px-3 py-2 bg-[#dfdedf]"
                    />
                    <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded">Add</button>
                </Form>
            </div>
            <div className="mt-6 pl-8">
                <Outlet />
            </div>
        </main>
    );
}