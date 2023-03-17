import { db } from "~/utils/db.server";

export async function createTask(title, projectId) {
    return db.task.create({
        data: {
            title,
            completed: false,
            projectId
        }
    });
}

export async function updateTask(id) {
    return db.task.update({
        where: {
            id,
        },
        data: {
            completed: true
        }
    })
}