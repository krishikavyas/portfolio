'use client'; 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MdCheck, MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { IoMdAdd } from "react-icons/io";
import info from '../../../assets/joneralInfo.json';
import style from './manage.module.scss';
import toast from 'react-hot-toast';
import TabComp from '@/components/TabComp/TabComp';
import Loader from '@/components/Loader/Loader';
import Link from 'next/link';

const { firstname, lastname } = info

const tabs = ["blogs", "archive"];

const ManageBlogs = ({ blogs: initialBlogs, isArchiveSelected }) => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [isLoading, setIsLoading] = useState(false)
  const [active, setActive] = useState(0)
  const router = useRouter();

  const handleDelete = async (slug) => {
    const deleteToast = toast.promise(
      axios.delete(`/api/blog/archive`, { params: { slug } }),  
      {
        loading: 'Deleting...',
        success: res => res.data.message || `Blog with slug ${slug} deleted permanently`,
        error: (err) => err.response?.data?.message || 'Failed to delete the blog.',
      }
    );
  
    try {
      const response = await deleteToast;
      if (response.data.status === 'success') {
        setBlogs(blogs.filter(blog => blog.slug !== slug));
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };
  

  const handleSwap = async (slug, ) => {
    const deleteToast = toast.promise(
      axios.post(`/api/blog/archive`, { slug, to: tabs[active] }),
      {
        loading: 'Processing...',
        success: res => res.data.message,
        error: (err) => err.response?.data?.message || 'Failed to delete the blog.',
      }
    );

    try {
      const response = await deleteToast;
      if (response.data.status === 'success') {
        setBlogs(blogs.filter(blog => blog.slug !== slug));
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  useEffect(() => {
    const view = tabs[active] || "blogs";
      (async () => {
        router.replace(`/blog/manage?view=${view}`);
        setBlogs([])
        setIsLoading(true)
        try {
          const res = await axios.get(`/api/blog/${view != "blogs" ? view : ""}`);
          setBlogs(res.data.blogs);
        } catch (error) {
          console.log({error})
          toast.error('Failed to fetch archive blogs');
        } finally {
          setIsLoading(false)
        }
      })()
  }, [active, router])

  return (
    <div className='container'>
      <section className={style.manageBlogs}>
        <div className={style.manageTopSection}>
          <div className={style.nav}>
            <TabComp items={tabs} active={active} setActive={setActive} />
          </div>
          <Link href="/blog/create"><IoMdAdd /></Link>
        </div>
        {isLoading && <Loader/>}
        {blogs.map(blog => (
          <div key={blog.slug} className={style.blogContainer}>
            <div className={style.BtnSection}>
              {tabs[active] == "archive" && (
                <>
                  <a className={style.delete} onClick={() => handleDelete(blog.slug)}><MdDelete /> Delete Permanently</a>
                  <a className={style.delete} onClick={() => handleSwap(blog.slug)}><MdDelete /> Restore</a>
                </>
              )}
              {tabs[active] == "blogs" && (
                <>
                  <a className={style.delete} onClick={() => handleSwap(blog.slug)}><MdDelete /> Move to Archive</a>
                  <Link className={style.delete} href={`/blog/${blog.slug}`}><MdRemoveRedEye /> View</Link>
                  <a className={style.delete}><MdCheck /> Update</a>
                </>
              )}
            </div>
            <div className={style.blockContent}>
              <div className={style.content}>
                <p>{`${firstname} ${lastname}`}</p>
                <h2>{blog.title}</h2>
                <p className={style.desc}>{blog.description}</p>
                <div className={style.bottomItems}>
                  <p><FcCalendar />{new Date(blog.date).toDateString()}</p>
                </div>
              </div>
              <div className={`imgWrapper ${style.imgWrapper}`}>
                <Image
                  priority={false}
                  fill
                  loading='eager'
                  alt={`${blog.title} image`}
                  src={blog.img}
                  className={style.blogImg}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ManageBlogs;
