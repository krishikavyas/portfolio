export default function robots() {
    return {
      rules: {
        userAgent: '*',
        disallow: ['/blog/manage', '/blog/add', "/login"],

      },
      sitemap: `${process.env.NEXT_PUBLIC_HOST}sitemap.xml`,
    }
  }