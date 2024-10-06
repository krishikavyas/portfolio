// app/sitemap-blogs.js

import dbConnect from "@/lib/mongoose";
import Blog from "@/models/Blog";

export const revalidate = 0;

export default async function sitemap() {
    await dbConnect();
    const blogs = await Blog.find({ isArchived: false }, { slug: 1, date: 1 });

    const blogRoutes = blogs.map(blog => ({
        url: `${process.env.NEXT_PUBLIC_HOST}blog/${blog.slug}`,
        lastModified: new Date(blog.date),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    return blogRoutes;
}
