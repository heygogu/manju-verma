"use client"

import { motion } from "framer-motion"
import { ExternalLink, Calendar } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

interface WebsiteProps {
  website: {
    _id: string
    title: string
    clientName: string
    url: string
    thumbnailImage: string
    description: string
    tags: string[]
    completionDate: string
  }
  index: number
}

export default function WebsiteCard({ website, index }: WebsiteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Link href={`/websites/${website._id}`}>
        <Card className="overflow-hidden pt-0 pb-6 h-full border border-[#ffffff20] bg-[#ffffff08] backdrop-blur-sm hover:shadow-[0_0_15px_rgba(255,0,255,0.3)] transition-all duration-300 w-full">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={website.thumbnailImage || "/placeholder.svg?height=400&width=600"}
              alt={website.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-lg font-bold text-white truncate">{website.title}</h3>
              <p className="text-sm text-white/80">{website.clientName}</p>
            </div>
          </div>
          <CardContent className="p-3 sm:p-4">
            <p className="text-sm text-gray-300 line-clamp-3 mb-4">{website.description}</p>
            <div className="flex items-center text-xs text-gray-400 gap-2 mb-2">
              <Calendar className="h-3 w-3" />
              <span>{new Date(website.completionDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-xs text-gray-400 gap-2">
              <ExternalLink className="h-3 w-3" />
              <span className="truncate">{website.url}</span>
            </div>
          </CardContent>
          <CardFooter className="p-3 sm:p-4 pt-0 flex flex-wrap gap-2">
            {website.tags.slice(0, 3).map((tag, i) => (
              <Badge key={i} variant="outline" className="bg-[#ffffff10] text-xs capitalize">
                {tag}
              </Badge>
            ))}
            {website.tags.length > 3 && (
              <Badge variant="outline" className="bg-[#ffffff10] text-xs">
                +{website.tags.length - 3}
              </Badge>
            )}
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}

