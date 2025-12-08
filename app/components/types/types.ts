export interface HomeDataType {
    welcomeTitle: string
    welcomeNote: string
    welcomeDescription: string
    cvFile: string
    userImage: string
}

export interface SocialLinkType {
    name: string,
    link: string,
    icon: string
}

export interface AboutType {
    paragraph: string,
}

export interface ExperienceType {
    inputs: ExperienceInput[];
    image: string;
    title: string;
    name: string;
    start: string;
    end: string;
}

interface ExperienceInput {
    id: string;
    content: string;
    experienceId: string;
    createdAt: string;
    updatedAt: string;
}


export interface ProjectType {
    tools: { name: string }[]
    title: string
    about: string
    cover: string
    link: string
}

export interface BlogType {
    title: string
    cover: string
    link: string
    createdAt?: string
}