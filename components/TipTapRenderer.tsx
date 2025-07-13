import { motion } from "framer-motion";
export const TipTapRenderer = ({
  content,
  variants,
}: {
  content: any;
  variants: any;
}) => {
  return (
    <motion.div variants={variants} className='max-w-none text-white z-50'>
      <div
        className='space-y-4
                   [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:mt-8 [&>h1]:text-white
                   [&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:mb-4 [&>h2]:mt-6 [&>h2]:text-white
                   [&>h3]:text-2xl [&>h3]:font-medium [&>h3]:mb-3 [&>h3]:mt-4 [&>h3]:text-white
                   [&>h4]:text-xl [&>h4]:font-medium [&>h4]:mb-2 [&>h4]:mt-3 [&>h4]:text-white
                   [&>h5]:text-lg [&>h5]:font-medium [&>h5]:mb-2 [&>h5]:mt-2 [&>h5]:text-white
                   [&>h6]:text-base [&>h6]:font-medium [&>h6]:mb-1 [&>h6]:mt-2 [&>h6]:text-white
                   [&>p]:text-base [&>p]:leading-relaxed [&>p]:mb-4 [&>p]:text-white
                   [&>strong]:font-bold [&>strong]:text-white
                   [&>em]:italic [&>em]:text-white
                   [&>u]:underline [&>u]:text-white
                   [&>s]:line-through [&>s]:text-white
                   [&>mark]:bg-yellow-300 [&>mark]:text-black [&>mark]:px-1 [&>mark]:rounded
                   [&>code]:bg-gray-800 [&>code]:text-yellow-300 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono
                   [&>pre]:bg-gray-900 [&>pre]:text-white [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-4
                   [&>pre>code]:bg-transparent [&>pre>code]:p-0 [&>pre>code]:text-white
                   [&>a]:text-blue-400 [&>a]:underline [&>a]:hover:text-blue-300 [&>a]:transition-colors
                   [&>blockquote]:border-l-4 [&>blockquote]:border-blue-400 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-300 [&>blockquote]:my-4 [&>blockquote]:bg-gray-800/30 [&>blockquote]:py-2 [&>blockquote]:rounded-r
                   [&>ul]:list-disc [&>ul]:list-inside [&>ul]:space-y-2 [&>ul]:mb-4 [&>ul]:text-white [&>ul]:ml-4
                   [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:space-y-2 [&>ol]:mb-4 [&>ol]:text-white [&>ol]:ml-4
                   [&>ul>li]:text-white [&>ul>li]:leading-relaxed
                   [&>ol>li]:text-white [&>ol>li]:leading-relaxed
                   [&>ul>li>ul]:mt-2 [&>ul>li>ul]:mb-2 [&>ul>li>ul]:ml-4
                   [&>ol>li>ol]:mt-2 [&>ol>li>ol]:mb-2 [&>ol>li>ol]:ml-4
                   [&>ul>li>ol]:mt-2 [&>ul>li>ol]:mb-2 [&>ul>li>ol]:ml-4
                   [&>ol>li>ul]:mt-2 [&>ol>li>ul]:mb-2 [&>ol>li>ul]:ml-4
                   [&>img]:max-w-full [&>img]:h-auto [&>img]:rounded-lg [&>img]:my-4 [&>img]:shadow-lg
                   [&>figure]:my-6 [&>figure]:text-center
                   [&>figure>img]:max-w-full [&>figure>img]:h-auto [&>figure>img]:rounded-lg [&>figure>img]:shadow-lg [&>figure>img]:mx-auto
                   [&>figure>figcaption]:text-gray-400 [&>figure>figcaption]:text-sm [&>figure>figcaption]:mt-2 [&>figure>figcaption]:italic
                   [&>table]:w-full [&>table]:border-collapse [&>table]:my-4 [&>table]:bg-gray-800/30 [&>table]:rounded-lg [&>table]:overflow-hidden
                   [&>table>thead]:bg-gray-700
                   [&>table>thead>tr>th]:p-3 [&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:font-semibold [&>table>thead>tr>th]:text-white [&>table>thead>tr>th]:border-b [&>table>thead>tr>th]:border-gray-600
                   [&>table>tbody>tr>td]:p-3 [&>table>tbody>tr>td]:text-white [&>table>tbody>tr>td]:border-b [&>table>tbody>tr>td]:border-gray-700
                   [&>table>tbody>tr:hover]:bg-gray-700/50
                   [&>hr]:border-gray-600 [&>hr]:my-6
                   [&>div]:text-white
                   [&>span]:text-white'
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </motion.div>
  );
};
