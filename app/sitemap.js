 export default function sitemap() {
  return [
    {
      url: 'https://portfolio-pink-tau-67.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://portfolio-pink-tau-67.vercel.app/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}