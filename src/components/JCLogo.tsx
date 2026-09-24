import { motion } from "framer-motion";
import { useTheme } from "../lib/ThemeContext";

interface LogoProps {
  size?: number;
  className?: string;
}

export function JCLogo({ size = 32, className = "" }: LogoProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
          stroke={isDark ? "#7c3aed" : "#7c3aed"}
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
          stroke={isDark ? "#fff" : "#1d1d1f"}
          strokeWidth="6"
          strokeLinecap="square"
          strokeLinejoin="miter"
          custom={1}
          variants={draw}
          initial="hidden"
          animate="visible"
        />
        
      </svg>
    </motion.div>
  );
}
