
export async function getBlogs() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/blog`, { cache: 'no-store' });
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
  