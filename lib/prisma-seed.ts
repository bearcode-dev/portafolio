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
            slug: "ecommerce-con-administracion",
            about: "Administrador de Ecommerce en Angular",
            description: "Administrador de Ecommerce en Angular",
            cover: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&q=80",
            coverImage: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&q=80",
            link: "https://github.com/Spiritbe4r/ngAdmin",
            toolIDs: toolIds,
            technologies: []


        }
    });

    console.log('Database seeded with project and tools:', project);
}



