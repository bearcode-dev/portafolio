import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  const modernBlogs = [
    {
      title: "El Futuro del Desarrollo Frontend: WebAssembly y Micro-Frontends",
      cover: "https://res.cloudinary.com/dmnzrw08u/image/upload/v1700000000/blog-cover-wasm.jpg",
      link: "https://example.com/blog/webassembly-microfrontends",
      createdAt: new Date("2024-07-25T10:00:00Z"),
      updatedAt: new Date("2024-07-25T10:00:00Z"),
    },
    {
      title: "Inteligencia Artificial en el Desarrollo de Software: Herramientas y Tendencias",
      cover: "https://res.cloudinary.com/dmnzrw08u/image/upload/v1700000000/blog-cover-ai.jpg",
      link: "https://example.com/blog/ai-software-dev",
      createdAt: new Date("2024-07-20T14:30:00Z"),
      updatedAt: new Date("2024-07-20T14:30:00Z"),
    },
    {
      title: "Optimización de Rendimiento en Next.js 14: Estrategias Avanzadas",
      cover: "https://res.cloudinary.com/dmnzrw08u/image/upload/v1700000000/blog-cover-nextjs.jpg",
      link: "https://example.com/blog/nextjs-perf-opt",
      createdAt: new Date("2024-07-18T09:00:00Z"),
      updatedAt: new Date("2024-07-18T09:00:00Z"),
    },
    {
      title: "Seguridad en Aplicaciones Web Modernas: Un Enfoque Práctico",
      cover: "https://res.cloudinary.com/dmnzrw08u/image/upload/v1700000000/blog-cover-security.jpg",
      link: "https://example.com/blog/web-security-guide",
      createdAt: new Date("2024-07-10T11:00:00Z"),
      updatedAt: new Date("2024-07-10T11:00:00Z"),
    },
    {
      title: "Desarrollo Sostenible: Construyendo Software con Impacto Ambiental Reducido",
      cover: "https://res.cloudinary.com/dmnzrw08u/image/upload/v1700000000/blog-cover-green-code.jpg",
      link: "https://example.com/blog/sustainable-dev",
      createdAt: new Date("2024-07-05T16:00:00Z"),
      updatedAt: new Date("2024-07-05T16:00:00Z"),
    },
  ];

  for (const blogData of modernBlogs) {
    await prisma.blog.upsert({
      where: { title: blogData.title },
      update: {},
      create: blogData,
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
