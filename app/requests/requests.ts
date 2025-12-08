import { fetchJSON } from "../../lib/request-util";
import { AboutType, BlogType, ExperienceType, HomeDataType, ProjectType, SocialLinkType } from "../components/types/types";



export const getAboutParagraphsV2 = async (): Promise<AboutType[] | []> => {
    try {
        const data = await fetchJSON<AboutType[]>(`/api/about-me`);
        return data ?? [];
    } catch (error) {
        console.warn('Error fetching about paragraphs, returning empty array:', error);
        return [];
    }
}


export const getHomeDataV2 = async (url?: string): Promise<HomeDataType | null> => {
    try {
        const apiUrl = url || `/api/user-details`;
        const data = await fetchJSON<HomeDataType>(apiUrl);
        return data;
    } catch (error) {
        console.error('Error fetching home data:', error);
        return null;
    }
}


export const getExperiencesV2 = async (): Promise<ExperienceType[] | []> => {
    try {
        const data = await fetchJSON<ExperienceType[]>(`/api/experiences`) as any;
        console.log('DATA', data);
        return data ?? [];
    } catch (error) {
        console.warn('Error fetching experiences, returning empty array:', error);
        return [];
    }
}


export const getBlogsV2 = async (): Promise<BlogType[] | []> => {
    try {
        const data = await fetchJSON<BlogType[]>(`/api/blogs`);
        return data ?? [];
    } catch (error) {
        // Log a warning if fetching blogs fails
        console.warn('Error fetching blogs, returning empty array:', error);
        return [];
    }
}


export const getProjectsV2 = async (): Promise<ProjectType[] | []> => {
    try {
        const data = await fetchJSON<ProjectType[]>(`/api/projects`);
        return data ?? [];
    } catch (error) {
        console.warn('Error fetching projects, returning empty array:', error);
        return [];
    }
}

export const getSocialLinksV2 = async (): Promise<SocialLinkType[] | []> => {
    try {
        const data = await fetchJSON<SocialLinkType[]>(`/api/user-social-links`);
        console.log('SOCIALLINKS', JSON.stringify(data));
        return data ?? [];
    } catch (error) {
        console.warn('Error fetching social links, returning empty array:', error);
        return [];
    }
}