import ProjectData from "@/assets/projectsData.json"
import dbConnect from "@/lib/mongoose";
import Blog from "@/models/Blog";

export const revalidate = 0

export default async function sitemap() {

    await dbConnect()
    const blogs = await Blog.find({ isArchived: false }, { slug: 1, date: 1})
    console.log({blogs})
    const blogRoutes = blogs.map(blog => ({
        url: `${process.env.NEXT_PUBLIC_HOST}/blog/${blog.slug}`,
        lastModified: new Date(blog.date),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    const projectsRoutes = ProjectData.map(e => {
        const priority = e.priority || 0.8

        const slug = e.slug || e.title.replace(" ", "-")

        return {
            url: `${process.env.NEXT_PUBLIC_HOST}/project/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority,
        }
    })
    return [
        {
          url: `${process.env.NEXT_PUBLIC_HOST}`,
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 1,
        },
        {
          url: `${process.env.NEXT_PUBLIC_HOST}/about`,
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 0.8,
        },
        {
          url: `${process.env.NEXT_PUBLIC_HOST}/blog`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        },
        {
          url: `${process.env.NEXT_PUBLIC_HOST}/work`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        },
        {
          url: `${process.env.NEXT_PUBLIC_HOST}/contact`,
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 0.8,
        },
        ...projectsRoutes,
        ...blogRoutes
    ]
}