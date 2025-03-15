"use client"

import { motion } from "framer-motion"
import { Mail, Calendar, BarChart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

interface EmailProps {
  email: {
    _id: string
    title: string
    clientName: string
    thumbnailImage: string
    description: string
    emailType: string
    subject: string
    tags: string[]
    completionDate: string
    results?: {
      openRate?: number
    }
  }
  index: number
}

export default function EmailCard({ email, index }: EmailProps) {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -10, transition: { duration: 0.2 } }}
        className="h-full w-full"
      >
        <Link href={`/emails/${email._id}`} className="block w-full">
          <Card className="overflow-hidden pt-0 pb-6 h-full border border-[#ffffff20] bg-[#ffffff08] backdrop-blur-sm hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={email.thumbnailImage || "/placeholder.svg?height=400&width=600"}
                alt={email.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 border-none">{email.emailType}</Badge>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-bold text-white break-words text-wrap  truncate">{email.title}</h3>
                <p className="text-sm text-white/80  break-words text-wrap truncate">{email.clientName}</p>
              </div>
            </div>
            <CardContent className="p-3">
              <div className="flex items-center text-sm font-medium mb-2 text-gray-200">
      
                <span className="truncate font-semibold text-cyan-300 line-clamp-2 text-wrap">{email.subject}</span>
              </div>
              <p className="text-sm text-gray-300 text-wrap break-words line-clamp-2 mb-4">{email.description}</p>
              { (
                <div className="flex items-center text-xs text-gray-400 gap-2 mb-2">
                  <BarChart className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{email?.results?.openRate}% open rate</span>
                </div>
              )}
              <div className="flex items-center text-xs text-gray-400 gap-2">
                <Calendar className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{new Date(email.completionDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-0 flex flex-wrap gap-2">
              {email.tags.slice(0, 2).map((tag, i) => (
                <Badge key={i} variant="outline" className="bg-[#ffffff10] text-xs capitalize">
                  {tag}
                </Badge>
              ))}
              {email.tags.length > 2 && (
                <Badge variant="outline" className="bg-[#ffffff10] text-xs">
                  +{email.tags.length - 2}
                </Badge>
              )}
            </CardFooter>
          </Card>
        </Link>
      </motion.div>
    </div>
  )
}

