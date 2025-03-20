"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Eye, Tag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useScroll } from "framer-motion";

type BlogPost = {
  data: {
    content: string;
    coverImage: string;
    publishDate: string;
    tags: string[];
    title: string;
    updatedAt: string;
    views: number;
    author: string;
    excerpt?: string;
  };
};

// Add this to your BlogPostContent component
export function BlogJsonLd({ post }:any) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage,
    "datePublished": post.publishDate,
    "dateModified": post.updatedAt || post.publishDate,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://manjuverma.com/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Manju Verma",
      "logo": {
        "@type": "ImageObject",
        "url": "https://manjuverma.com/"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://manjuverma.com/blog/${post.slug}`
    },
    "keywords": post.tags.join(", ")
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
export default function BlogPostContent({ post }: { post: BlogPost }) {
  if (!post?.data) return null;

  
  
  const { scrollYProgress } = useScroll();
  const [scaleX, setScaleX] = useState(0);

  useEffect(() => {
    const updateScaleX = () => {
      setScaleX(scrollYProgress.get());
    };

    updateScaleX();

    const unsubscribe = scrollYProgress.onChange(updateScaleX);

    return () => {
      unsubscribe();
    };
  }, [scrollYProgress]);

  const {
    content,
    coverImage,
    publishDate,
    tags,
    title,
    updatedAt,
    views,
    author,
  } = post.data;

  // Format dates
  const publishedDate = new Date(publishDate);
  const formattedPublishDate = publishedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeAgo = formatDistanceToNow(new Date(updatedAt), { addSuffix: true });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="bg-[#0F0F1A]">
      {/* Progress bar */}
      <BlogJsonLd post={post.data} />
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF00FF] via-[#00FFFF] to-[#FF00FF] z-10"
        style={{ scaleX: scaleX }}
      />

      {/* Background elements */}
      <div
        className="fixed left-0 right-0 top-[calc(100vh-65vh)]"
        style={{ zIndex: 0 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[#0F0F1A] opacity-90" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[10%] left-[20%] w-64 h-64 rounded-full bg-[#FF00FF] filter blur-[100px] opacity-20 animate-pulse" />
          <div
            className="absolute top-[40%] right-[10%] w-96 h-96 rounded-full bg-[#00FFFF] filter blur-[120px] opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-[20%] left-[30%] w-80 h-80 rounded-full bg-[#9900FF] filter blur-[150px] opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 z-50 max-w-4xl relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="relative">
            <div className="rounded-2xl overflow-hidden aspect-video relative shadow-xl">
              <Image
                src={coverImage || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover transition-transform rounded-2xl duration-700 hover:scale-105"
                priority
                placeholder="blur"
                blurDataURL="/placeholder.svg"
              />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 z-50">
              <div className="flex flex-wrap gap-2 mb-2">
                {tags?.map((tag: string, index: number) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Post Meta */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold z-50 bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">
              {title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full z-50 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {author?.charAt(0)}
                </div>
                <div>
                  <p className="font-medium z-50 text-white">{author}</p>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar size={14} className="mr-1 z-50" />
                    <span className="z-50">{formattedPublishDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 z-50 text-gray-400 text-sm">
                <div className="flex items-center">
                  <Clock size={14} className="mr-1 z-50" />
                  <span className="z-50">Updated {timeAgo}</span>
                </div>
                <div className="flex items-center">
                  <Eye size={14} className="mr-1 z-50" />
                  <span className="z-50">{views?.toLocaleString()} views</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            variants={itemVariants}
            className="prose prose-lg max-w-none prose-invert text-white z-50 prose-headings:text-white prose-a:text-white"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Tags */}
          <motion.div
            variants={itemVariants}
            className="pt-8 z-50 border-t border-gray-200 dark:border-gray-800"
          >
            <h3 className="text-lg font-medium text-white mb-4">
              Related Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags?.map((tag: string, index: number) => (
                <motion.div key={index}>
                  {/* <Link
                    href={`/tag/${tag?.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-block"
                  > */}
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full transition duration-200 inline-flex items-center"
                    >
                      <Tag size={14} className="mr-1 z-50" />
                      {tag}
                    </motion.span>
                  {/* </Link> */}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
