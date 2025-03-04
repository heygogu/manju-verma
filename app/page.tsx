"use client"
import { useState, useTransition } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  ChevronDown,
  Edit3,
  FileText,
  Loader,
  Mail,
  MessageSquare,
  Mic,
  PenTool,
  Send,
  Star,
  Target,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { toast } from "sonner"
import { submitContactForm } from "./actions"


export default function Portfolio() {
  // const ref = useRef(null)
 
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  // const rotation = useTransform(scrollYProgress, [0, 1], [0, 360])
  // const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])
  const [isPending, startTransition] = useTransition();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY })
  //   }
    
  //   window.addEventListener('mousemove', handleMouseMove)
  //   return () => window.removeEventListener('mousemove', handleMouseMove)
  // }, [])
  
  // const cursorVariants = {
  //   default: {
  //     x: mousePosition.x - 16,
  //     y: mousePosition.y - 16,
  //   }
  // }




  const submitForm = async (e: any) => {
    e.preventDefault();
   
   
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };
    console.log(payload)
    startTransition(async () => {
      const result = await submitContactForm(payload);
      
      if (result.success) {
        toast("Email sent successfully!", {
          className: "bg-[#00FF00] text-white",
        });
      } else {
        toast("Could not send email", {
          className: "bg-red-500 text-white",
          description: result.error || "Error sending email.",
        });
      }
    });
  };


  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white overflow-hidden">
      {/* Custom cursor */}
      {/* <motion.div 
        className="fixed w-8 h-8 rounded-full border-2 border-[#FF00FF] mix-blend-difference pointer-events-none z-50 hidden md:block"
        variants={cursorVariants}
        animate="default"
      /> */}
      
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF00FF] via-[#00FFFF] to-[#FF00FF] z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[#0F0F1A] opacity-90" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[10%] left-[20%] w-64 h-64 rounded-full bg-[#FF00FF] filter blur-[100px] opacity-20 animate-pulse" />
          <div className="absolute top-[40%] right-[10%] w-96 h-96 rounded-full bg-[#00FFFF] filter blur-[120px] opacity-20 animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute bottom-[20%] left-[30%] w-80 h-80 rounded-full bg-[#9900FF] filter blur-[150px] opacity-20 animate-pulse" style={{animationDelay: '2s'}} />
        </div>
      </div>

      {/* Header */}
      <header  className="fixed top-0 z-40 w-full backdrop-blur-xl bg-[#0F0F1A]/50 border-b border-[#ffffff10]">
        <div className="container px-2 md:px-10 flex h-16 items-center justify-between">
          <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2"
          >
        <div className="relative" id="header">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-200"></div>
          <div className="relative flex items-center justify-center rounded-full bg-[#0F0F1A] p-1.5">
            <Edit3 className="h-6 w-6 text-[#00FFFF]" />
          </div>
        </div>
        <span className="text-xl ml-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">Manju.Writes</span>
          </motion.div>
          
          <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden md:flex items-center gap-8"
          >
        {["About", "Services","Blogs", "Portfolio", "Testimonials", "Contact"].map((item, i) => (
          <Link 
            key={i}
            href={`#${item.toLowerCase()}`} 
            className="text-sm font-medium relative group"
            onClick={(e) => {
              if (item.toLowerCase() === "blogs") {
                e.preventDefault();
                const blogTab = document.getElementById("blog-tab");
                if (blogTab) {
                  blogTab.click();
                }
                document.getElementById("blogs")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className="relative z-10 text-white group-hover:text-[#00FFFF] transition-colors duration-300">{item}</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] group-hover:w-full transition-all duration-300"></span>
          </Link>
        ))}
          </motion.nav>
          
          <div className="flex items-center gap-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button className="relative hidden md:flex  group overflow-hidden bg-transparent border border-[#ffffff30] hover:border-[#ffffff60]">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative  z-10">Let&apos;s Talk</span>
            <ArrowRight className="relative z-10 ml-2 h-4 w-4" />
          </Button>
        </motion.div>
        
        <button 
          className="block md:hidden cursor-pointer"
          onClick={() => setMobileMenuOpen(true)}
        >
          <div className="space-y-1.5">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#0F0F1A] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] rounded-full blur-sm"></div>
                  <div className="relative flex items-center justify-center rounded-full bg-[#0F0F1A] p-1.5">
                    <Edit3 className="h-6 w-6 text-[#00FFFF]" />
                  </div>
                </div>
                <span className="text-xl ml-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">Manju.Writes</span>
              </div>
              <button className="cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 text-lg">
              {["About", "Services","Blogs", "Portfolio", "Testimonials", "Contact"].map((item, i) => (
                <Link 
                  key={i}
                  href={`#${item.toLowerCase()}`} 
                  className="text-white hover:text-[#00FFFF] transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
            
            <div className="mt-auto">
              <Button className="w-full relative group overflow-hidden bg-transparent border border-[#ffffff30]">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10">Let&apos;s Talk</span>
                <ArrowRight className="relative z-10 ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main >
        {/* Hero Section */}
        <section className="relative px-7 md:px-10 overflow-hidden py-20 md:py-32">
          <div className="container relative z-10">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col gap-6"
              >
                <div className="inline-flex items-center rounded-full border border-[#ffffff30] px-4 py-1.5 text-sm font-medium bg-[#ffffff10] backdrop-blur-sm">
                  <span className="flex h-2 w-2 rounded-full bg-[#00FFFF] mr-2"></span>
                  Available for freelance projects
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Crafting <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">Words</span> That <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="relative"
                  >
                    <motion.span
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1.2, duration: 1 }}
                      className="absolute bottom-2 left-0 h-3 bg-gradient-to-r from-[#FF00FF]/30 to-[#00FFFF]/30 z-0"
                    />
                    <span className="relative z-10">Captivate</span>
                  </motion.span>
                </h1>
                <p className="text-xl text-[#ffffffcc]">
                  Content writer with 3+ years of experience creating compelling narratives that engage, inform, and convert.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button size="lg" className="relative group overflow-hidden">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] opacity-100 group-hover:opacity-80 transition-opacity duration-300"></span>
                    <span className="relative z-10 text-white">View My Work</span>
                    <ArrowRight className="relative z-10 ml-2 h-4 w-4 text-white" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-[#ffffff30] hover:border-[#ffffff60] text-white hover:text-[#00FFFF] transition-colors duration-300">
                    Download Resume
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-[#0F0F1A] overflow-hidden">
                        <Image 
                          src={`https://i.pravatar.cc/100?img=${i+10}`} 
                          alt="Client" 
                          width={40} 
                          height={40} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-white">50+ clients</span>
                    <span className="text-[#ffffffaa]"> trusted my content</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] rounded-2xl blur-xl opacity-30"></div>
                <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-[#ffffff30]">
                  <Image 
                    src="https://images.pexels.com/photos/5717641/pexels-photo-5717641.jpeg" 
                    alt="Content Writer" 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] to-transparent" />
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -bottom-6 -left-6 rounded-xl bg-[#0F0F1A]/80 backdrop-blur-xl p-4 border border-[#ffffff20]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#FF00FF]/20 to-[#00FFFF]/20">
                      <FileText className="h-5 w-5 text-[#00FFFF]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#ffffffcc]">Projects Completed</div>
                      <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">200+</div>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -top-6 -right-6 rounded-xl bg-[#0F0F1A]/80 backdrop-blur-xl p-4 border border-[#ffffff20]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#FF00FF]/20 to-[#00FFFF]/20">
                      <Star className="h-5 w-5 text-[#FF00FF]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#ffffffcc]">Client Satisfaction</div>
                      <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">98%</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <motion.div 
            style={{ y }}
            className="absolute -bottom-48 left-0 right-0 h-80 bg-gradient-to-r from-[#FF00FF]/5 to-[#00FFFF]/5 -skew-y-3"
          />
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-5 md:px-10 relative">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center mb-16"
            >
              <div className="inline-flex items-center rounded-full border border-[#ffffff30] px-4 py-1.5 text-sm font-medium bg-[#ffffff10] backdrop-blur-sm mb-4">
                About Me
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">The Story Behind the Words</h2>
              <p className="max-w-3xl text-[#ffffffcc] text-lg">
                Passionate about crafting compelling narratives that resonate with audiences and drive results.
              </p>
            </motion.div>

            <div className="grid gap-12 md:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] rounded-2xl blur-xl opacity-30"></div>
                <div className="relative h-[600px] w-full rounded-2xl overflow-hidden border border-[#ffffff30]">
                  <Image 
                    src="https://images.pexels.com/photos/6893859/pexels-photo-6893859.jpeg" 
                    alt="About Me" 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] to-transparent" />
                </div>
                <div className="absolute -bottom-8 -right-5 md:-right-8 h-56 w-56 md:h-64 md:w-64 rounded-full border-8 border-[#fc82fc] bg-gradient-to-r from-[#FF00FF]/10 to-[#00FFFF]/10 z-0" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-col gap-6"
              >
                <h3 className="text-2xl font-bold">Hi, I&apos;m <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">Manju Verma</span></h3>
                <p className="text-[#ffffffcc]">
                  With over 3 years of experience in content writing, I&apos;ve helped businesses across various industries establish their voice and connect with their audience through compelling storytelling.
                </p>
                <p className="text-[#ffffffcc]">
                  My journey began with a passion for words and a degree in English Literature. Since then, I&apos;ve worked with startups, established brands, and everything in between to create content that not only ranks well but also resonates with readers.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {[
                    { icon: <PenTool className="h-5 w-5 text-[#FF00FF]" />, label: "SEO Content" },
                    { icon: <BookOpen className="h-5 w-5 text-[#00FFFF]" />, label: "Blog Articles" },
                    { icon: <Target className="h-5 w-5 text-[#FF00FF]" />, label: "Email Campaigns" },
                    { icon: <Users className="h-5 w-5 text-[#00FFFF]" />, label: "Social Media" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffffff10]">
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button className="relative group overflow-hidden">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] opacity-100 group-hover:opacity-80 transition-opacity duration-300"></span>
                    <span className="relative z-10 text-white">Contact Me</span>
                    <ArrowRight className="relative z-10 ml-2 h-4 w-4 text-white" />
                  </Button>
                  <Button variant="outline" className="border-[#ffffff30] hover:border-[#ffffff60] text-white hover:text-[#00FFFF] transition-colors duration-300">
                    Download CV
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20  px-5 md:px-10 bg-[#ffffff05]">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center mb-16"
            >
              <div className="inline-flex items-center rounded-full  border border-[#ffffff30] px-4 py-1.5 text-sm font-medium bg-[#ffffff10] backdrop-blur-sm mb-4">
                My Services
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text z-10  text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">How I Can Help You</h2>
              <p className="max-w-3xl z-10 text-[#ffffffcc] text-lg">
                Specialized content writing services tailored to your specific needs and goals.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <FileText className="h-10 w-10 text-[#FF00FF]" />,
                  title: "Blog & Article Writing",
                  description: "Engaging, SEO-optimized blog posts and articles that establish your authority and drive organic traffic."
                },
                {
                  icon: <Target className="h-10 w-10 text-[#00FFFF]" />,
                  title: "Website Copywriting",
                  description: "Compelling website copy that communicates your value proposition and converts visitors into customers."
                },
                {
                  icon: <Mail className="h-10 w-10 text-[#FF00FF]" />,
                  title: "Email Campaigns",
                  description: "Strategic email sequences that nurture leads, build relationships, and drive conversions."
                },
                {
                  icon: <Users className="h-10 w-10 text-[#00FFFF]" />,
                  title: "Social Media Content",
                  description: "Engaging social media content that builds community and increases brand awareness."
                },
                {
                  icon: <Mic className="h-10 w-10 text-[#FF00FF]" />,
                  title: "Podcast Scripts",
                  description: "Well-structured podcast scripts that engage listeners and deliver value."
                },
                {
                  icon: <BookOpen className="h-10 w-10 text-[#00FFFF]" />,
                  title: "Ebooks & Whitepapers",
                  description: "In-depth resources that position you as an industry leader and generate quality leads."
                },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-xl border border-[#ffffff20] bg-[#ffffff08] backdrop-blur-sm p-6 hover:border-[#ffffff40] transition-all duration-300"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#FF00FF]/10 to-[#00FFFF]/10 group-hover:from-[#FF00FF]/20 group-hover:to-[#00FFFF]/20 transition-colors duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-[#ffffffcc]">{service.description}</p>
                    <Link href="#" className="inline-flex items-center text-[#00FFFF] font-medium group-hover:text-[#FF00FF] transition-colors duration-300">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-[#ffffff10] group-hover:border-[#ffffff30] transition-all duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 px-5 md:px-10" >
          <div className="container" id="blogs">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center mb-16"
            >
              <div className="inline-flex items-center rounded-full border border-[#ffffff30] px-4 py-1.5 text-sm font-medium bg-[#ffffff10] backdrop-blur-sm mb-4">
                My Portfolio
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text z-10 text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">Featured Work</h2>
              <p className="max-w-3xl text-[#ffffffcc] z-10 text-lg">
                A selection of my best content writing projects across various industries.
              </p>
            </motion.div>

            <Tabs  defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8 z-10">
                <TabsList  className="bg-[#ffffff10] border border-[#ffffff20]">
                  <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF00FF] data-[state=active]:to-[#00FFFF] data-[state=active]:text-white">All</TabsTrigger>
                  <TabsTrigger id="blog-tab" value="blogs" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF00FF] data-[state=active]:to-[#00FFFF] data-[state=active]:text-white">Blogs</TabsTrigger>
                  <TabsTrigger value="websites" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF00FF] data-[state=active]:to-[#00FFFF] data-[state=active]:text-white">Websites</TabsTrigger>
                  <TabsTrigger value="emails" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF00FF] data-[state=active]:to-[#00FFFF] data-[state=active]:text-white">Emails</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "How to Optimize Your Content for SEO",
                      category: "Blog Article",
                      client: "TechCorp",
                      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                    },
                    {
                      title: "E-commerce Product Descriptions",
                      category: "Website Copy",
                      client: "Fashion Brand",
                      image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg"
                    },
                    {
                      title: "Email Nurture Sequence",
                      category: "Email Campaign",
                      client: "SaaS Company",
                      image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg"
                    },
                    {
                      title: "Ultimate Guide to Content Marketing",
                      category: "Ebook",
                      client: "Marketing Agency",
                      image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg"
                    },
                    {
                      title: "Social Media Content Calendar",
                      category: "Social Media",
                      client: "Retail Brand",
                      image: "https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg"
                    },
                    {
                      title: "Company About Page Rewrite",
                      category: "Website Copy",
                      client: "Consulting Firm",
                      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
                    },
                  ].map((project, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative overflow-hidden rounded-xl border border-[#ffffff20]"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-0"></div>
                      <div className="aspect-[4/3] w-full overflow-hidden relative z-10">
                        <Image 
                          src={project.image || "/placeholder.svg"} 
                          alt={project.title} 
                          width={600} 
                          height={400} 
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] via-[#0F0F1A]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="text-sm font-medium text-[#00FFFF] mb-2">{project.category}</div>
                        <h3 className="text-xl font-bold mb-1 text-white">{project.title}</h3>
                        <p className="text-[#ffffffcc] mb-4">Client: {project.client}</p>
                        <Button size="sm" className="relative group overflow-hidden w-fit">
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] opacity-100 group-hover:opacity-80 transition-opacity duration-300"></span>
                          <span className="relative z-10 text-white">View Project</span>
                          <ArrowRight className="relative z-10 ml-2 h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="blogs" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "How to Optimize Your Content for SEO",
                      category: "Blog Article",
                      client: "TechCorp",
                      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                    },
                    {
                      title: "10 Content Marketing Trends for 2023",
                      category: "Blog Article",
                      client: "Marketing Agency",
                      image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg"
                    },
                    {
                      title: "The Ultimate Guide to Storytelling",
                      category: "Blog Article",
                      client: "Media Company",
                      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
                    },
                  ].map((project, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative overflow-hidden rounded-xl border border-[#ffffff20]"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-0"></div>
                      <div className="aspect-[4/3] w-full overflow-hidden relative z-10">
                        <Image 
                          src={project.image || "/placeholder.svg"} 
                          alt={project.title} 
                          width={600} 
                          height={400} 
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] via-[#0F0F1A]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="text-sm font-medium text-[#00FFFF] mb-2">{project.category}</div>
                        <h3 className="text-xl font-bold mb-1 text-white">{project.title}</h3>
                        <p className="text-[#ffffffcc] mb-4">Client: {project.client}</p>
                        <Button size="sm" className="relative group overflow-hidden w-fit">
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] opacity-100 group-hover:opacity-80 transition-opacity duration-300"></span>
                          <span className="relative z-10 text-white">View Project</span>
                          <ArrowRight className="relative z-10 ml-2 h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              {/* Similar structure for other tabs */}
              <TabsContent value="websites" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {/* Website projects */}
                </div>
              </TabsContent>
              
              <TabsContent value="emails" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {/* Email projects */}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center mt-12">
              <Button variant="outline" size="lg" className="border-[#ffffff30] hover:border-[#ffffff60] text-white z-50 hover:text-[#00FFFF] transition-colors duration-300">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 px-5 md:px-10 bg-[#ffffff05]">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center mb-16"
            >
              <div className="inline-flex items-center rounded-full border border-[#ffffff30] px-4 py-1.5 text-sm font-medium bg-[#ffffff10] backdrop-blur-sm mb-4">
                My Process
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">How I Work</h2>
              <p className="max-w-3xl text-[#ffffffcc] z-10 text-lg">
                A streamlined approach to delivering high-quality content that meets your objectives.
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-[#FF00FF] to-[#00FFFF] -translate-x-1/2 hidden md:block" />
              
              <div className="space-y-12 relative">
                {[
                  {
                    number: "01",
                    title: "Discovery & Research",
                    description: "I start by understanding your business, audience, and goals to ensure the content aligns with your strategy."
                  },
                  {
                    number: "02",
                    title: "Content Strategy",
                    description: "Based on research, I develop a content strategy that outlines topics, keywords, and formats to achieve your objectives."
                  },
                  {
                    number: "03",
                    title: "Content Creation",
                    description: "I craft engaging, well-researched content that speaks to your audience and reflects your brand voice."
                  },
                  {
                    number: "04",
                    title: "Review & Refinement",
                    description: "You review the content and provide feedback, and I make revisions until you're completely satisfied."
                  },
                  {
                    number: "05",
                    title: "Delivery & Support",
                    description: "I deliver the finalized content and provide ongoing support to ensure it achieves the desired results."
                  },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                  >
                    <div className="w-full md:w-1/2 flex justify-center">
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] rounded-full blur-xl opacity-30"></div>
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] text-4xl font-bold text-white relative z-10">
                          {step.number}
                        </div>
                        <div className="absolute -inset-7 rounded-full border-2 border-dashed border-[#ffffff30] animate-spin" />
                      </div>
                    </div>
                    <div className="w-full mt-2 md:mt-0 md:w-1/2 bg-[#ffffff08] backdrop-blur-sm rounded-xl p-8 border border-[#ffffff20] relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#FF00FF] to-[#1d4a4a] rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-[#ffffffcc]">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className=" px-5 md:px-10 py-20">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center mb-16"
            >
              <div className="inline-flex  items-center rounded-full border border-[#ffffff30] px-4 py-1.5 text-sm font-medium bg-[#ffffff10] backdrop-blur-sm mb-4">
                Testimonials
              </div>
              <h2 className="text-3xl z-10 md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">What Clients Say</h2>
              <p className="max-w-3xl z-10 text-[#ffffffcc] text-lg">
                Don&apos;t just take my word for it. Here&apos;s what my clients have to say about working with me.
              </p>
            </motion.div>

            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {[
                  {
                    quote: "Manju transformed our blog with engaging, SEO-optimized content that increased our organic traffic by 150% in just three months. Her ability to understand our brand voice and target audience is exceptional.",
                    name: "Michael Thompson",
                    title: "Marketing Director, TechCorp",
                    avatar: "https://i.pravatar.cc/100?img=11"
                  },
                  {
                    quote: "Working with Manju was a game-changer for our content strategy. She delivered high-quality articles consistently and was always responsive to feedback. Our engagement metrics have never been better.",
                    name: "Jessica Chen",
                    title: "Content Manager, E-commerce Brand",
                    avatar: "https://i.pravatar.cc/100?img=5"
                  },
                  {
                    quote: "Manju's email campaigns have been instrumental in improving our conversion rates. Her ability to craft compelling narratives that resonate with our audience is truly impressive.",
                    name: "David Wilson",
                    title: "CEO, SaaS Startup",
                    avatar: "https://i.pravatar.cc/100?img=12"
                  },
                ].map((testimonial, i) => (
                  <CarouselItem key={i}>
                    <div className="p-6">
                      <Card className="bg-[#ffffff08] backdrop-blur-sm border border-[#ffffff20] relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                        <CardContent className="p-6 flex flex-col items-center text-center relative z-10">
                          <div className="mb-6 flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-5 w-5 fill-[#00FFFF] text-[#00FFFF]" />
                            ))}
                          </div>
                          <blockquote className="text-xl italic mb-6 text-[#ffffffee]">&quot;{testimonial.quote}&quot;</blockquote>
                          <div className="flex flex-col items-center">
                            <div className="h-16 w-16 rounded-full overflow-hidden mb-4 border-2 border-[#ffffff30]">
                              <Image 
                                src={testimonial.avatar || "/placeholder.svg"} 
                                alt={testimonial.name} 
                                width={80} 
                                height={80} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="text-lg font-bold text-white">{testimonial.name}</div>
                            <div className="text-sm text-[#ffffffaa]">{testimonial.title}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8">
                <CarouselPrevious className="relative mr-2 bg-[#ffffff10] border-[#ffffff30] hover:bg-[#ffffff20] text-white" />
                <CarouselNext className="relative ml-2 bg-[#ffffff10] border-[#ffffff30] hover:bg-[#ffffff20] text-white" />
              </div>
            </Carousel>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-5 md:px-10 bg-[#ffffff05]">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { number: "200+", label: "Projects Completed" },
                { number: "50+", label: "Happy Clients" },
                { number: "3+", label: "Years Experience" },
                { number: "98%", label: "Client Satisfaction" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="z-10 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] mb-2">{stat.number}</div>
                  <div className="z-10 text-[#ffffffcc]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-5 md:px-10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-xl bg-gradient-to-r from-[#FF00FF]/10 to-[#00FFFF]/10 border border-[#ffffff20] p-8 md:p-12 lg:p-16 relative overflow-hidden"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] rounded-xl blur-3xl opacity-20"></div>
              <div className="grid gap-6 md:grid-cols-2 items-center relative z-10">
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">Ready to elevate your content?</h2>
                  <p className="text-lg text-[#ffffffcc] ">
                    Let&apos;s work together to create content that engages your audience and drives results.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Button size="lg" className="relative group overflow-hidden">
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] opacity-100 group-hover:opacity-80 transition-opacity duration-300"></span>
                      <span className="relative z-10 text-white">Get Started</span>
                      <ArrowRight className="relative z-10 ml-2 h-4 w-4 text-white" />
                    </Button>
                    <Button size="lg" variant="outline" className="border-[#ffffff30] hover:border-[#ffffff60] text-white hover:text-[#00FFFF] transition-colors duration-300">
                      View Portfolio
                    </Button>
                  </div>
                </div>
                <div className="relative hidden md:block">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] rounded-xl blur-xl opacity-30"></div>
                  <Image 
                    src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg" 
                    alt="Call to Action" 
                    width={500} 
                    height={300} 
                    className="rounded-xl shadow-xl relative z-10"
                  />
                </div>
              </div>
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FF00FF]/20 blur-3xl" />
              <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#00FFFF]/20 blur-3xl" />
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-5 md:px-10 bg-[#ffffff05]">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center mb-16"
            >
              <div className="inline-flex items-center rounded-full border border-[#ffffff30] px-4 py-1.5 text-sm font-medium bg-[#ffffff10] backdrop-blur-sm mb-4">
                Contact Me
              </div>
              <h2 className="text-3xl z-10 md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">Let&apos;s Work Together</h2>
              <p className="max-w-3xl z-10 text-[#ffffffcc] text-lg">
                Have a project in mind? Get in touch and let&apos;s create something amazing together.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-[#ffffff08] backdrop-blur-sm rounded-xl border border-[#ffffff20] p-8 relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <form onSubmit={submitForm} className="space-y-6 relative z-10">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-white">Name</label>
                      <Input id="name" name="name"
                      
                      placeholder="Your name" className="bg-[#ffffff10] border-[#ffffff30] focus:border-[#00FFFF] text-white placeholder:text-[#ffffff80]" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-white">Email</label>
                      <Input id="email" type="email" name="email"
                      
                      placeholder="Your email" className="bg-[#ffffff10] border-[#ffffff30] focus:border-[#00FFFF] text-white placeholder:text-[#ffffff80]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-white">Subject</label>
                    <Input id="subject"
                    name="subject"
                    placeholder="Project subject" className="bg-[#ffffff10] border-[#ffffff30] focus:border-[#00FFFF] text-white placeholder:text-[#ffffff80]" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-white">Message</label>
                    <Textarea id="message" 
                   name="message"
                    placeholder="Tell me about your project" className="min-h-32 bg-[#ffffff10] border-[#ffffff30] focus:border-[#00FFFF] text-white placeholder:text-[#ffffff80]" />
                  </div>
                    <Button type="submit" className="w-full cursor-pointer relative group overflow-hidden" disabled={isPending}>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] opacity-100 group-hover:opacity-80 transition-opacity duration-300"></span>
                    <span className="relative z-10 text-white flex items-center justify-center">
                      {isPending ? (
                        <>
                        Sending...
                      <Loader className="animate-spin h-4 w-4 ml-2 text-white" />
                        </>
                      ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4 text-white" />
                      </>
                      )}
                    </span>
                    </Button>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-col gap-8"
              >
                <div className="rounded-xl border border-[#ffffff20] bg-[#ffffff08] backdrop-blur-sm p-6 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-4 text-white">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#FF00FF]/20 to-[#00FFFF]/20">
                          <Mail className="h-5 w-5 text-[#00FFFF]" />
                        </div>
                        <div>
                          <div className="text-sm text-[#ffffffaa]">Email</div>
                          <div className="font-medium text-white">vermamisthi432@gmail.com</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#FF00FF]/20 to-[#00FFFF]/20">
                          <MessageSquare className="h-5 w-5 text-[#FF00FF]" />
                        </div>
                        <div>
                          <div className="text-sm text-[#ffffffaa]">Social Media</div>
                          <div className="font-medium text-white">
                            {/* <Link href="#" className="text-[#00FFFF] hover:text-[#FF00FF] transition-colors">Twitter</Link> */}
                            <Link target="_blank" href="https://www.linkedin.com/in/manju-verma-111b8518b/" className="h-6 w-6   flex items-center justify-center rounded-full bg-[#ffffff10] hover:bg-[#ffffff20] transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00FFFF] group-hover:text-[#FF00FF] transition-colors">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[#ffffff20] bg-[#ffffff08] backdrop-blur-sm p-6 relative group">
                  <div className="  bg-[#ffffff08] backdrop-blur-sm p-6 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-4 text-white">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      {[
                        {
                          question: "What are your rates?",
                          answer: "My rates vary depending on the project scope, complexity, and timeline. Contact me for a custom quote."
                        },
                        {
                          question: "What is your turnaround time?",
                          answer: "Turnaround time depends on the project size and my current workload. I'll provide a timeline estimate before starting any project."
                        },
                        {
                          question: "Do you offer revisions?",
                          answer: "Yes, I include up to two rounds of revisions with every project to ensure you're completely satisfied with the final result."
                        },
                      ].map((faq, i) => (
                        <div key={i} className="space-y-2">
                          <div className="font-medium flex items-center text-white">
                            <CheckCircle className="h-4 w-4 text-[#00FFFF] mr-2" />
                            {faq.question}
                          </div>
                          <p className="text-sm text-[#ffffffcc] pl-6">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-tz-50 border-[#ffffff20] px-5 md:px-10">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4 z-10">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] rounded-full blur-sm opacity-70"></div>
                  <div className="relative flex items-center justify-center rounded-full bg-[#0F0F1A] p-1.5">
                    <Edit3 className="h-6 w-6 text-[#00FFFF]" />
                  </div>
                </div>
                <span className="text-xl ml-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">Manju.Writes</span>
              </div>
              <p className="text-[#ffffffcc]">
                Professional content writer helping brands tell their stories and connect with their audience.
              </p>
            </div>
            <div className="z-10">
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#about" className="text-[#ffffffcc] hover:text-[#00FFFF] transition-colors">About</Link>
                </li>
                <li>
                  <Link href="#services" className="text-[#ffffffcc] hover:text-[#00FFFF] transition-colors">Services</Link>
                </li>
                <li>
                  <Link href="#portfolio" className="text-[#ffffffcc] hover:text-[#00FFFF] transition-colors">Portfolio</Link>
                </li>
                <li>
                  <Link href="#contact" className="text-[#ffffffcc] hover:text-[#00FFFF] transition-colors">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="z-10">
              <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-[#ffffffcc] hover:text-[#00FFFF] transition-colors">Blog Writing</Link>
                </li>
                <li>
                  <Link href="#" className="text-[#ffffffcc] hover:text-[#00FFFF] transition-colors">Website Copy</Link>
                </li>
                <li>
                  <Link href="#" className="text-[#ffffffcc] hover:text-[#00FFFF] transition-colors">Email Campaigns</Link>
                </li>
                <li>
                  <Link href="#" className="text-[#ffffffcc] hover:text-[#00FFFF] transition-colors">Social Media</Link>
                </li>
              </ul>
            </div>
            <div className="z-10">
              <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
              <div className="flex space-x-4">
                <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-[#ffffff10] hover:bg-[#ffffff20] transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF00FF] group-hover:text-[#00FFFF] transition-colors">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-[#ffffff10] hover:bg-[#ffffff20] transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00FFFF] group-hover:text-[#FF00FF] transition-colors">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-[#ffffff10] hover:bg-[#ffffff20] transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF00FF] group-hover:text-[#00FFFF] transition-colors">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                <Link target="_blank" href="https://www.linkedin.com/in/manju-verma-111b8518b/" className="h-10 w-10 flex items-center justify-center rounded-full bg-[#ffffff10] hover:bg-[#ffffff20] transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00FFFF] group-hover:text-[#FF00FF] transition-colors">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12  pt-8 border-t  text-center text-sm text-[#ffffffaa]">
            <p className=" text-white">&copy; 2025 Manju Verma. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="icon"
          onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })}
          className="h-12 w-12 rounded-full shadow-lg relative group overflow-hidden"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] opacity-100 group-hover:opacity-80 transition-opacity duration-300"></span>
          <ChevronDown className="h-6 w-6 rotate-180 relative z-10 text-white" />
        </Button>
      </motion.div>
    </div>
  )
}

