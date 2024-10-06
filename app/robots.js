export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/blog/manage', '/blog/add', '/blog/add', "/login"],

      },
      sitemap: `${process.env.NEXT_PUBLIC_HOST}sitemap.xml`,
    }
  }