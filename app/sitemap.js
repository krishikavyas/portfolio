// app/sitemap.js

export default function sitemap() {
    return [
        {
            url: `${process.env.NEXT_PUBLIC_HOST}pages/sitemap.xml`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}work/sitemap.xml`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}blog/sitemap.xml`,
            lastModified: new Date(),
        },
    ];
}
