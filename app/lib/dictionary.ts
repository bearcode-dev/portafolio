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
    },
};

export const getDictionary = (lang: Locale) => {
    return dictionary[lang] || dictionary.en;
};
