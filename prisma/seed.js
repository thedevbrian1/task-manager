const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function seed() {
    await Promise.all(
        getProjects().map((project) => {
            return db.project.create({
                data: project
            })
        })
    );
}

seed();

function getProjects() {
    return [
        {
            title: 'U-14 Football',
            // task: {
            //     create: {
            //         title: 'Brian Mwangi',
            //         completed: false,

            //     }
            // }
        },
        {
            title: 'Events',
        },
        {
            title: 'Meetings',
        }
    ]
}