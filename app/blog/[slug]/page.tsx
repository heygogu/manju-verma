// app/blog/[slug]/page.tsx
"use client"

import BlogPost from '@/components/BlogPost';

import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';




export default function BlogPostPage() {
  const params = useParams();
  const [post,setPost] = useState(null);
  async function getBlogPostBySlug(slug: string) {
    try {
      // Use absolute URL for server-side fetching
      const response = await axios.get(`/api/blogs/${slug}`);
      console.log('response', response?.data);
      // return response?.data;
      setPost(response?.data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw new Error('Failed to fetch blog post');
    }
  }

  useEffect(() => {
    getBlogPostBySlug(String(params?.slug));
  }, []);
  
  return (
       
        <BlogPost post={post} />
     
  );
}