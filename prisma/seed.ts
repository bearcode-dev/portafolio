import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  console.log('Start seeding...');

  // Seed Resource Categories
  const categoriesData = [
    { name: 'Frontend Development', description: 'Modern frontend frameworks, libraries, and best practices for building interactive web applications.' },
    { name: 'Backend Development', description: 'Server-side technologies, APIs, databases, and backend architecture patterns.' },
    { name: 'DevOps & Cloud', description: 'Deployment strategies, cloud services, CI/CD, and infrastructure management.' },
    { name: 'AI & Machine Learning', description: 'Artificial intelligence, machine learning models, and data science resources.' },
    { name: 'Mobile Development', description: 'Native and cross-platform mobile app development tools and frameworks.' },
    { name: 'Design & UX', description: 'User interface design, user experience principles, and design systems.' },
    { name: 'Career & Soft Skills', description: 'Professional development, communication, and career growth resources.' },
  ];

  const createdCategories: Record<string, any> = {};
  for (const categoryData of categoriesData) {
    const slug = generateSlug(categoryData.name);
    const category = await prisma.resourceCategory.upsert({
      where: { slug },
      update: { description: categoryData.description },
      create: { ...categoryData, slug },
    });
    createdCategories[category.name] = category;
    console.log(`Created/Updated category: ${category.name}`);
  }

  // Seed Resources
  const resourcesData = [
    // Frontend Development
    {
      title: 'Complete Guide to Next.js 14 App Router',
      description: 'Master the new App Router, Server Components, and streaming features in Next.js 14. Includes practical examples and best practices.',
      content: 'Deep dive into Next.js 14 App Router architecture, Server Components, nested layouts, loading states, error handling, and advanced patterns for production apps.',
      coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
      link: 'https://nextjs.org/docs',
      type: 'Tutorial',
      categoryName: 'Frontend Development',
      tags: ['Next.js', 'React', 'App Router', 'SSR'],
      author: 'Vercel Team',
      publishedAt: new Date('2024-11-15T10:00:00Z'),
      readTimeMinutes: 45,
    },
    {
      title: 'TypeScript Best Practices 2024',
      description: 'Essential TypeScript patterns, type utilities, and advanced techniques for building scalable applications.',
      content: 'Comprehensive guide covering type narrowing, generics, utility types, conditional types, and real-world TypeScript patterns for modern web development.',
      coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
      link: 'https://www.typescriptlang.org/docs/',
      type: 'Article',
      categoryName: 'Frontend Development',
      tags: ['TypeScript', 'JavaScript', 'Type Safety', 'Best Practices'],
      author: 'Matt Pocock',
      publishedAt: new Date('2024-10-20T14:00:00Z'),
      readTimeMinutes: 30,
    },
    {
      title: 'Tailwind CSS: From Zero to Hero',
      description: 'Learn utility-first CSS with Tailwind. Build beautiful, responsive interfaces faster than ever.',
      content: 'Complete Tailwind CSS course covering utility classes, responsive design, customization, plugins, and component patterns.',
      coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
      link: 'https://tailwindcss.com/docs',
      type: 'Video',
      categoryName: 'Frontend Development',
      tags: ['Tailwind', 'CSS', 'UI', 'Responsive Design'],
      author: 'Adam Wathan',
      publishedAt: new Date('2024-09-10T09:00:00Z'),
      readTimeMinutes: 120,
    },
    {
      title: 'React Query: Data Fetching Made Easy',
      description: 'Master server state management with TanStack Query. Learn caching, mutations, and optimistic updates.',
      content: 'Comprehensive guide to React Query covering queries, mutations, cache management, optimistic updates, and advanced patterns.',
      coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
      link: 'https://tanstack.com/query/latest',
      type: 'Tutorial',
      categoryName: 'Frontend Development',
      tags: ['React Query', 'Data Fetching', 'State Management', 'React'],
      author: 'Tanner Linsley',
      publishedAt: new Date('2024-08-25T11:30:00Z'),
      readTimeMinutes: 40,
    },

    // Backend Development
    {
      title: 'Building RESTful APIs with Node.js & Express',
      description: 'Design and implement scalable REST APIs with authentication, validation, and best practices.',
      content: 'Learn to build production-ready APIs with Express, including middleware, error handling, authentication, database integration, and testing.',
      coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      link: 'https://expressjs.com/',
      type: 'Tutorial',
      categoryName: 'Backend Development',
      tags: ['Node.js', 'Express', 'REST API', 'Backend'],
      author: 'Traversy Media',
      publishedAt: new Date('2024-10-05T10:00:00Z'),
      readTimeMinutes: 55,
    },
    {
      title: 'Prisma ORM Complete Guide',
      description: 'Modern database toolkit for TypeScript. Learn schema design, migrations, and type-safe queries.',
      content: 'Master Prisma ORM with MongoDB, PostgreSQL, and MySQL. Covers schema design, relations, migrations, and advanced querying.',
      coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
      link: 'https://www.prisma.io/docs',
      type: 'Article',
      categoryName: 'Backend Development',
      tags: ['Prisma', 'ORM', 'Database', 'TypeScript'],
      author: 'Prisma Team',
      publishedAt: new Date('2024-09-18T13:00:00Z'),
      readTimeMinutes: 35,
    },
    {
      title: 'GraphQL API Design Patterns',
      description: 'Build flexible APIs with GraphQL. Learn schema design, resolvers, and performance optimization.',
      content: 'Complete guide to GraphQL covering schema design, queries, mutations, subscriptions, batching, and N+1 problem solutions.',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      link: 'https://graphql.org/learn/',
      type: 'Ebook',
      categoryName: 'Backend Development',
      tags: ['GraphQL', 'API', 'Schema Design', 'Apollo'],
      author: 'Apollo Team',
      publishedAt: new Date('2024-07-30T15:00:00Z'),
      readTimeMinutes: 90,
    },

    // DevOps & Cloud
    {
      title: 'Docker for Developers',
      description: 'Containerize your applications with Docker. Learn images, containers, compose, and deployment.',
      content: 'Practical Docker guide covering Dockerfiles, multi-stage builds, docker-compose, networking, volumes, and production deployments.',
      coverImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80',
      link: 'https://docs.docker.com/',
      type: 'Tutorial',
      categoryName: 'DevOps & Cloud',
      tags: ['Docker', 'Containers', 'DevOps', 'Deployment'],
      author: 'Docker Inc.',
      publishedAt: new Date('2024-11-01T09:00:00Z'),
      readTimeMinutes: 50,
    },
    {
      title: 'CI/CD with GitHub Actions',
      description: 'Automate your workflow with GitHub Actions. Build, test, and deploy with ease.',
      content: 'Learn to create automated workflows with GitHub Actions, including testing, building, deploying, and custom actions.',
      coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80',
      link: 'https://docs.github.com/actions',
      type: 'Article',
      categoryName: 'DevOps & Cloud',
      tags: ['GitHub Actions', 'CI/CD', 'Automation', 'DevOps'],
      author: 'GitHub',
      publishedAt: new Date('2024-08-15T12:00:00Z'),
      readTimeMinutes: 25,
    },
    {
      title: 'Vercel Deployment Guide',
      description: 'Deploy Next.js apps to Vercel with edge functions, analytics, and preview deployments.',
      content: 'Complete guide to Vercel platform covering deployments, environment variables, edge functions, analytics, and team collaboration.',
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      link: 'https://vercel.com/docs',
      type: 'Tool',
      categoryName: 'DevOps & Cloud',
      tags: ['Vercel', 'Deployment', 'Edge Functions', 'Hosting'],
      author: 'Vercel',
      publishedAt: new Date('2024-10-28T10:30:00Z'),
      readTimeMinutes: 20,
    },

    // AI & Machine Learning
    {
      title: 'Introduction to Machine Learning with Python',
      description: 'Learn ML fundamentals with scikit-learn. From linear regression to neural networks.',
      content: 'Comprehensive introduction to machine learning covering supervised/unsupervised learning, model evaluation, and practical projects.',
      coverImage: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80',
      link: 'https://scikit-learn.org/',
      type: 'Tutorial',
      categoryName: 'AI & Machine Learning',
      tags: ['Python', 'Machine Learning', 'scikit-learn', 'AI'],
      author: 'Andrew Ng',
      publishedAt: new Date('2024-09-05T14:00:00Z'),
      readTimeMinutes: 60,
    },
    {
      title: 'Building AI Apps with OpenAI API',
      description: 'Integrate ChatGPT and GPT-4 into your applications. Learn prompting, embeddings, and fine-tuning.',
      content: 'Learn to build AI-powered applications using OpenAI API, including chat completions, embeddings, function calling, and RAG patterns.',
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      link: 'https://platform.openai.com/docs',
      type: 'Article',
      categoryName: 'AI & Machine Learning',
      tags: ['OpenAI', 'ChatGPT', 'AI', 'API Integration'],
      author: 'OpenAI',
      publishedAt: new Date('2024-11-10T16:00:00Z'),
      readTimeMinutes: 35,
    },

    // Mobile Development
    {
      title: 'React Native: Cross-Platform Mobile Development',
      description: 'Build native mobile apps with React. One codebase for iOS and Android.',
      content: 'Complete React Native guide covering components, navigation, state management, native modules, and app deployment.',
      coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      link: 'https://reactnative.dev/',
      type: 'Video',
      categoryName: 'Mobile Development',
      tags: ['React Native', 'Mobile', 'iOS', 'Android'],
      author: 'Meta',
      publishedAt: new Date('2024-10-12T11:00:00Z'),
      readTimeMinutes: 180,
    },
    {
      title: 'Expo: The Fastest Way to Build Apps',
      description: 'Rapid mobile development with Expo. From prototype to production in record time.',
      content: 'Learn Expo development covering managed workflow, EAS Build, EAS Update, push notifications, and native modules.',
      coverImage: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80',
      link: 'https://docs.expo.dev/',
      type: 'Tutorial',
      categoryName: 'Mobile Development',
      tags: ['Expo', 'React Native', 'Mobile', 'Development'],
      author: 'Expo Team',
      publishedAt: new Date('2024-09-22T13:30:00Z'),
      readTimeMinutes: 40,
    },

    // Design & UX
    {
      title: 'Figma for Developers',
      description: 'Bridge the gap between design and code. Learn to inspect designs and extract assets.',
      content: 'Developer-focused Figma guide covering design inspection, asset export, design systems, plugins, and dev mode.',
      coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      link: 'https://www.figma.com/developers',
      type: 'Tool',
      categoryName: 'Design & UX',
      tags: ['Figma', 'Design', 'UI/UX', 'Prototyping'],
      author: 'Figma',
      publishedAt: new Date('2024-08-08T10:00:00Z'),
      readTimeMinutes: 25,
    },
    {
      title: 'Design Systems: A Complete Guide',
      description: 'Build scalable design systems. Learn component libraries, tokens, and documentation.',
      content: 'Comprehensive guide to creating and maintaining design systems including component design, design tokens, and team collaboration.',
      coverImage: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&q=80',
      link: 'https://www.designsystems.com/',
      type: 'Ebook',
      categoryName: 'Design & UX',
      tags: ['Design Systems', 'Components', 'UI', 'Documentation'],
      author: 'Brad Frost',
      publishedAt: new Date('2024-07-20T14:00:00Z'),
      readTimeMinutes: 75,
    },

    // Career & Soft Skills
    {
      title: 'The Developer Career Guide',
      description: 'Navigate your software development career. From junior to senior and beyond.',
      content: 'Career development guide covering skill progression, interviews, salary negotiation, leadership, and work-life balance.',
      coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      link: 'https://example.com/career-guide',
      type: 'Ebook',
      categoryName: 'Career & Soft Skills',
      tags: ['Career', 'Professional Development', 'Leadership', 'Growth'],
      author: 'John Sonmez',
      publishedAt: new Date('2024-06-15T09:00:00Z'),
      readTimeMinutes: 120,
    },
    {
      title: 'Effective Code Reviews',
      description: 'Give and receive better code reviews. Build team collaboration and code quality.',
      content: 'Best practices for code reviews including constructive feedback, review checklist, automated checks, and team culture.',
      coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      link: 'https://example.com/code-reviews',
      type: 'Article',
      categoryName: 'Career & Soft Skills',
      tags: ['Code Review', 'Collaboration', 'Team', 'Best Practices'],
      author: 'Sarah Drasner',
      publishedAt: new Date('2024-10-01T11:00:00Z'),
      readTimeMinutes: 15,
    },
    {
      title: 'Technical Writing for Developers',
      description: 'Document your code effectively. Write clear README files, API docs, and tutorials.',
      content: 'Learn technical writing best practices for documentation, blog posts, tutorials, and open source contributions.',
      coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
      link: 'https://developers.google.com/tech-writing',
      type: 'Case Study',
      categoryName: 'Career & Soft Skills',
      tags: ['Documentation', 'Writing', 'Communication', 'Open Source'],
      author: 'Google',
      publishedAt: new Date('2024-09-01T10:00:00Z'),
      readTimeMinutes: 30,
    },
  ];

  for (const resourceData of resourcesData) {
    const slug = generateSlug(resourceData.title);
    const category = createdCategories[resourceData.categoryName];

    if (!category) {
      console.error(`Category ${resourceData.categoryName} not found for resource ${resourceData.title}. Skipping.`);
      continue;
    }

    await prisma.resource.upsert({
      where: { slug },
      update: {
        description: resourceData.description,
        content: resourceData.content,
        coverImage: resourceData.coverImage,
        link: resourceData.link,
        type: resourceData.type,
        categoryId: category.id,
        tags: resourceData.tags,
        author: resourceData.author,
        publishedAt: resourceData.publishedAt,
        readTimeMinutes: resourceData.readTimeMinutes,
      },
      create: {
        title: resourceData.title,
        slug,
        description: resourceData.description,
        content: resourceData.content,
        coverImage: resourceData.coverImage,
        link: resourceData.link,
        type: resourceData.type,
        categoryId: category.id,
        tags: resourceData.tags,
        author: resourceData.author,
        publishedAt: resourceData.publishedAt,
        readTimeMinutes: resourceData.readTimeMinutes,
      },
    });
    console.log(`Created/Updated resource: ${resourceData.title}`);
  }

  console.log('Seeding finished.');
  console.log(`✅ Created ${Object.keys(createdCategories).length} categories`);
  console.log(`✅ Created ${resourcesData.length} resources`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
