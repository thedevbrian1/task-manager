import { json } from "@remix-run/node";

export function validateProject(title) {
    if (title.length === 0) {
        return 'Project title cannot be empty';
    }
}

export function badRequest(data) {
    return json(data, { status: 404 });
}