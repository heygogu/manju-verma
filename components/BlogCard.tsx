import { useState } from "react"
import {motion} from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Project {
    title: string
    slug: string
    excerpt: string
    coverImage: string
    tags: string[]
  
  }
 export function BlogCard({ project, index }: { project: Project; index: number }) {
    const [isHovered, setIsHovered] = useState(false)
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group relative overflow-hidden rounded-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Enhanced gradient border effect */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] rounded-xl blur-xl z-0"
          animate={{
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4 }}
        />
  
        {/* Image container */}
        <div className="aspect-[4/3] w-full overflow-hidden relative z-10">
          <motion.div
            animate={{
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="h-full w-full"
          >
            <Image
              src={project?.coverImage || "/placeholder.svg"}
              alt={project?.title}
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
  
        {/* Enhanced overlay with animated reveal */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#313146] via-[#0F0F1A]/80 to-transparent z-20"
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20,
          }}
          transition={{ duration: 0.3 }}
        />
  
        {/* Content container with animated reveal */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-4 z-30"
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Category badge with glow effect */}
          <div className="flex flex-wrap gap-2 mb-2">
            {project?.tags?.map((tag, i) => (
              <motion.div
                key={i}
                className="text-xs font-medium bg-gradient-to-r from-[#FF00FF] to-[#e273c195] rounded-full px-2.5 py-1"
                animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -10,
                }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
                style={{
            textShadow: "0 0 8px rgba(0, 255, 255, 0.5)",
                }}
              >
                {tag}
              </motion.div>
            ))}
          </div>
          
          {/* <motion.div
            className="text-sm font-medium text-[#00FFFF] mb-2"
            animate={{
              x: isHovered ? 0 : -10,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, delay: 0.15 }}
            style={{
              textShadow: "0 0 8px rgba(0, 255, 255, 0.5)",
            }}
          >
            {"Blog"}
          </motion.div> */}
  
          
  
          {/* Link button with enhanced animation */}
          <Link href={`/blog/${project?.slug}`} passHref>
            <motion.div
              animate={{
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, delay: 0.25 }}
            >
              {/* Title with animated reveal */}
          <motion.h3
            className="text-sm font-bold mb-1 text-white"
            animate={{
              y: isHovered ? 0 : 15,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {project?.title} <ArrowRight className="h-4 w-4 inline-block" />
          </motion.h3>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    )
  }