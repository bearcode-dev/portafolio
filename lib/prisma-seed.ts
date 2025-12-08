import db from "./db";


export async function seedDatabase() {


    const toolIds = await Promise.all([
        { name: 'Paypal API', description: '...', image: '' },
        { name: 'CSS', description: '...', image: '' }

    ].map(tool => db.projectTool.create({
        data: tool,
    }).then((createdTool: any) => createdTool.id)));

    const project = await db.project.create({
        data: {

            title: "Ecommerce con Administración",
            about: "Administrador de Ecommerce en Angular",
            cover: "media/cover/angular_yecgyn.png",
            link: "https://github.com/Spiritbe4r/ngAdmin",
            toolIDs: toolIds,


        }
    });

    console.log('Database seeded with project and tools:', project);
}



