import { ProjectType, SocialLinkType } from "../app/components/types/types";



export async function fetchJSON<T>(url: string): Promise<T> {
    // Si es una ruta relativa, construir la URL completa
    const fullUrl = url.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}${url}` : url;
    
    const response = await fetch(fullUrl, {
        method: "GET",
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
}
