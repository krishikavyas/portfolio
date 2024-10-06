
export async function getBlogs(limit) {

    const url = new URL(`${process.env.NEXT_PUBLIC_HOST}/api/blog`);
    if (limit) url.searchParams.append('limit', limit); 

    try {
      const res = await fetch(url.toString(), { cache: 'no-store' });
      if (!res.ok) {
        const errorData = await res.text();
        console.error('Failed to fetch data :', errorData);
        throw new Error('Failed to fetch blogs');
      }
      const data = await res.json();

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  