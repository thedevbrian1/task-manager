import { db } from "~/utils/db.server";

export async function getProjects() {
    return db.project.findMany({
        include: {
            tasks: true
        }
    });
}

export async function getProjectById(id) {
    return db.project.findUnique({
        where: {
            id
        },
        include: {
            tasks: true,
        }
    });
}

export async function createProject(title) {
    return db.project.create({
        data: {
            title
        }
    });
}