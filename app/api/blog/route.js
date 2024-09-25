import { uploadImageToCloudinary } from "@/lib/cloudinary";
import connectToDatabase from "@/lib/mongoose";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import { convertToSlug } from "@/utils/base64";
import { calculateReadingTime } from "@/utils/general";
import fs from "fs/promises";
import { NextResponse } from 'next/server';
import path from 'path';





export const blogsPath = path.join(process.cwd(), 'assets', 'blogs');


async function saveBase64Image(base64String, slug) {
  const matches = base64String.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!matches) throw new Error('Invalid base64 string');
  
  const format = matches[1];
  const base64Data = matches[2];
  
  const imageBuffer = Buffer.from(base64Data, 'base64');
  const uploadUrl = await uploadImageToCloudinary(imageBuffer, slug);
  
  return uploadUrl;
}


  export async function POST(request) {
    await connectToDatabase();
    try {
      // Parse JSON data from the request
      let { content, description, title, tags, slug, img, type = "SEO", seo, category} = await request.json();
      
      slug = slug ? slug : convertToSlug(title);
      slug = slug.replace(/\?/g, "")
  
      const finalBlog = { content, description, title, tags, slug, type, seo, category };
      finalBlog.readTime = calculateReadingTime(content);
  
      await connectToDatabase();
  
      const existingBlog = await Blog.findOne({ slug });
  
      if (existingBlog) {
        return NextResponse.json({ status: 'error', message: 'Blog with this slug already exists' }, { status: 400 });
      }
  
      if (img) {
        try {
          finalBlog.img = await saveBase64Image(img, slug);
        } catch (error) {
          return NextResponse.json({ status: 'error', message: `Failed to save image: ${error.message}` }, { status: 500 });
        }
      } 
  
      console.log("BLOG SAVE CALELD PRE")

      const newBlog = new Blog(finalBlog);
      console.log("BLOG SAVE CALELD")
      await newBlog.save();
  
      const url = new URL(`/blog/${slug}`, request.url);
      
      return NextResponse.json({ status: 'success', message: 'Blog added successfully', url: url.toString() });
    } catch (error) {
      // console.error('Error creating blog:', error);
      return NextResponse.json({ status: 'error', message: `An error occurred: ${error.message}` }, { status: 500 });
    }
  }


  export async function GET(req) {
    const isAdmin = req.headers.get('x-forwarded-verified') === 'true';
    const { searchParams } = new URL(req.url);
    const blogSlug = searchParams.get("id");
  
    try {
      await connectToDatabase();
  
      let blogs, category;
      
      if (blogSlug) {
        const decodedSlug = decodeURIComponent(blogSlug);
        const blog = await Blog.findOne({ slug: decodedSlug, isArchived: false });
        if (!blog) {
          return NextResponse.json({ status: 'error', message: 'No blog found with this slug' }, { status: 404 });
        }
  
        blogs = blog; 
      } else {
        blogs = await Blog.find({ isArchived: false });
        category = await Category.find();
      }
  
      return NextResponse.json({ status: 'success', blogs, isAdmin, category });
    } catch (error) {
      console.error('Error retrieving blogs:', error);
      return NextResponse.json({ status: 'error', message: `An error occurred: ${error.message}` }, { status: 500 });
    }
  }