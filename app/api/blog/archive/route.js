import path from 'path';
import { NextResponse } from 'next/server';
import Blog from '@/models/Blog';
import { deleteImageFromCloudinary } from '@/lib/cloudinary';

export async function POST(request) {
  try {
    await connectToDatabase();
    const { slug } = await request.json();

    // Find the blog by slug
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json({ status: 'error', message: 'Blog not found' }, { status: 404 });
    }

    blog.isArchived = !blog.isArchived;
    await blog.save();

    return NextResponse.json({
      status: 'success',
      message: `Blog ${blog.isArchived ? 'archived' : 'restored'} successfully`
    });
  } catch (error) {
    console.error('Error handling blog archiving:', error);
    return NextResponse.json({ status: 'error', message: `An error occurred: ${error.message}` }, { status: 500 });
  }
}



export async function DELETE(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ status: 'error', message: 'Slug is required' }, { status: 400 });
    }

    // Find the blog by slug
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json({ status: 'error', message: 'Blog not found' }, { status: 404 });
    }

    if (!blog.isArchived) {
      return NextResponse.json({ status: 'error', message: 'Blog is not archived' }, { status: 400 });
    }
    await Blog.findOneAndDelete({ slug })

    await deleteImageFromCloudinary(blog.slug)

    return NextResponse.json({ status: 'success', message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error handling blog deletion:', error);
    return NextResponse.json({ status: 'error', message: `An error occurred: ${error.message}` }, { status: 500 });
  }
}



export async function GET() {
  await connectToDatabase();
  try {
    // Find all archived blogs
    const archivedBlogs = await Blog.find({ isArchived: true });

    return NextResponse.json({ status: 'success', blogs: archivedBlogs });
  } catch (error) {
    console.error('Error fetching archived blogs:', error);
    return NextResponse.json({ status: 'error', message: `Failed to fetch archived blogs: ${error.message}` }, { status: 500 });
  }
}