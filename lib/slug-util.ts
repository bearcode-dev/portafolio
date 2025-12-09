// Helper function to generate a slug from a title
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\\s-]/g, '')
        .replace(/[\\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
