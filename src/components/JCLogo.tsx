import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  className?: string;
}

export function JCLogo({ size = 32, className = "" }: LogoProps) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = i * 0.15;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, duration: 1.5, ease: "easeInOut" },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
  } as any;

  return (
    <motion.div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.1, rotate: 90 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* The "J" - sharp, brutalist, minimal */}
        <motion.path
          d="M 40 20 L 40 70 L 20 70 L 20 60"
          stroke="#7c3aed"
          strokeWidth="6"
          strokeLinecap="square"
          strokeLinejoin="miter"
          custom={0}
          variants={draw}
          initial="hidden"
          animate="visible"
        />
        
        {/* The "C" - sharp, brutalist, minimal */}
        <motion.path
          d="M 80 30 L 60 30 L 60 70 L 80 70"
          stroke="#fff"
          strokeWidth="6"
          strokeLinecap="square"
          strokeLinejoin="miter"
          custom={1}
          variants={draw}
          initial="hidden"
          animate="visible"
        />
        
        {/* Technical framing lines */}
        <motion.path
          d="M 0 0 L 10 0 M 90 0 L 100 0 M 0 100 L 10 100 M 90 100 L 100 100"
          stroke="#444"
          strokeWidth="2"
          custom={2}
          variants={draw}
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M 0 0 L 0 10 M 100 0 L 100 10 M 0 90 L 0 100 M 100 90 L 100 100"
          stroke="#444"
          strokeWidth="2"
          custom={2}
          variants={draw}
          initial="hidden"
          animate="visible"
        />
      </svg>
    </motion.div>
  );
}
