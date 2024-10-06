// app/sitemap-projects.js

import ProjectData from "@/assets/projectsData.json";

export const revalidate = 0;

export default async function sitemap() {
    const projectsRoutes = ProjectData.map(e => {
        const priority = e.priority || 0.8;
        const slug = e.slug || e.title.replace(" ", "-");

        return {
            url: `${process.env.NEXT_PUBLIC_HOST}work/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority,
        };
    });

    return projectsRoutes;
}
