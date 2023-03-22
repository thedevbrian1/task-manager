import { db } from "~/utils/db.server";

export async function createTask(title, projectId) {
    return db.task.create({
        data: {
            title,
            complete: false,
            projectId
        }
    });
}

export async function updateTask(id, complete) {
    return db.task.update({
        where: {
            id,
        },
        data: {
            complete
        }
    })
}