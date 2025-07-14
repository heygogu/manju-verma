import { motion } from "framer-motion";
export const TipTapRenderer = ({
  content,
  variants,
  className,
}: {
  content: any;
  variants: any;
  className?: "";
}) => {
  console.log(content);
  return (
    <motion.div variants={variants} className='max-w-none text-white z-50'>
      <div
        className={`quill-content ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </motion.div>
  );
};
