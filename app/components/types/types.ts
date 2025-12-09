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

export type ResourceCategoryType = {
    id: string;
    name: string;
    slug: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
};

export type SkillCategoryType = {
    id: string;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    color?: string;
    order: number;
    skills?: SkillType[];
    createdAt: Date;
    updatedAt: Date;
};

export type SkillType = {
    id: string;
    name: string;
    slug: string;
    proficiency: number;
    categoryId: string;
    category?: SkillCategoryType;
    order: number;
    createdAt: Date;
    updatedAt: Date;
};

export type ResourceType = {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    coverImage: string;
    link?: string;
    type: 'Article' | 'Video' | 'Ebook' | 'Tutorial' | 'Tool' | 'Case Study';
    category: ResourceCategoryType;
    tags: string[];
    author: string;
    publishedAt: Date;
    readTimeMinutes?: number;
    createdAt: Date;
    updatedAt: Date;
};