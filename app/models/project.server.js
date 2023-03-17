import { db } from "~/utils/db.server";

export async function getProjects() {
    return db.project.findMany({
        include: {
            task: true
        }
    });
}

export async function getProjectById(id) {
    return db.project.findUnique({
        where: {
            id
        },
        include: {
            task: true,
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