export type Locale = 'en' | 'es';

export const dictionary = {
    en: {
        common: {
            downloadCV: "Download CV",
            connect: "Connect With Me",
            viewProject: "View Project",
            readMore: "Read More",
            present: "Present",
            loading: "Loading...",
        },
        nav: {
            home: "Home",
            experience: "Experience",
            projects: "Projects",
            blogs: "Blogs",
            resources: "Resources",
            about: "About",
            dashboard: "Dashboard",
        },
        experience: {
            title: "MY JOURNEY SO FAR",
        },
        projects: {
            title: "My Projects",
            description: "A collection of recent work showing my skills in frontend and backend development.",
            technologies: "Technologies",
        },
        blogs: {
            title: "My Blogs",
        },
        about: {
            title: "About Me",
            sendEmail: "Send Email",
            skills: "My Skills",
        },
        home: {
            welcome: "Welcome",
        },
        resources: {
            title: "Learning Resources",
            description: "Curated collection of valuable resources for developers and designers.",
            filterByCategory: "Filter by Category",
            filterByType: "Filter by Type",
            allCategories: "All Categories",
            allTypes: "All Types",
            types: {
                article: "Article",
                video: "Video",
                ebook: "Ebook",
                tutorial: "Tutorial",
                tool: "Tool",
                caseStudy: "Case Study",
            },
            viewResource: "View Resource",
            minRead: "min read",
        },
    },
    es: {
        common: {
            downloadCV: "Descargar CV",
            connect: "Conéctate Conmigo",
            viewProject: "Ver Proyecto",
            readMore: "Leer Más",
            present: "Presente",
            loading: "Cargando...",
        },
        nav: {
            home: "Inicio",
            experience: "Experiencia",
            projects: "Proyectos",
            blogs: "Blogs",
            resources: "Recursos",
            about: "Sobre Mí",
            dashboard: "Panel",
        },
        experience: {
            title: "MI VIAJE HASTA AHORA",
        },
        projects: {
            title: "Mis Proyectos",
            description: "Una colección de trabajos recientes que muestran mis habilidades en desarrollo frontend y backend.",
            technologies: "Tecnologías",
        },
        blogs: {
            title: "Mis Blogs",
        },
        about: {
            title: "Sobre Mí",
            sendEmail: "Enviar correo",
            skills: "Mis Habilidades",
        },
        home: {
            welcome: "Bienvenido",
        },
        resources: {
            title: "Recursos de Aprendizaje",
            description: "Colección curada de recursos valiosos para desarrolladores y diseñadores.",
            filterByCategory: "Filtrar por Categoría",
            filterByType: "Filtrar por Tipo",
            allCategories: "Todas las Categorías",
            allTypes: "Todos los Tipos",
            types: {
                article: "Artículo",
                video: "Video",
                ebook: "Ebook",
                tutorial: "Tutorial",
                tool: "Herramienta",
                caseStudy: "Caso de Estudio",
            },
            viewResource: "Ver Recurso",
            minRead: "min de lectura",
        },
    },
};

export const getDictionary = (lang: Locale) => {
    return dictionary[lang] || dictionary.en;
};
