// app/manage-blogs/page.js

import ManageBlogs from './ManageBlogs';
import { notFound } from 'next/navigation';

export const revalidate = 0

async function fetchBlogs() {
  const res = await fetch(`${process.env.HOST}/api/blog`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return res.json();
}

async function fetchArchivedBlogs() {
  const res = await fetch(`${process.env.HOST}/api/blog/archived`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch archived blogs');
  }
  return res.json();
}

export default async function ManagePage({ searchParams }) {
  const view = searchParams.view || 'blogs';
  const isArchiveSelected = view === 'archived';

  try {
    const { blogs, isAdmin: isVerified } = isArchiveSelected
      ? await fetchArchivedBlogs()
      : await fetchBlogs();

    return (
      <main>
        <ManageBlogs blogs={blogs} isVerified={isVerified} isArchiveSelected={isArchiveSelected} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return notFound(); 
  }
}
