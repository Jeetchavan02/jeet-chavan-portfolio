import React, { useRef, useEffect } from 'react';

interface OrbitCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function OrbitCard({ children, className = '', style = {}, onClick }: OrbitCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovering = false;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateTransform = () => {
      if (!card) return;
      
      if (isHovering) {
        currentX = lerp(currentX, targetX, 0.2);
        currentY = lerp(currentY, targetY, 0.2);
        card.style.setProperty('--dx', currentX.toFixed(4));
        card.style.setProperty('--dy', currentY.toFixed(4));
        
        // Disable CSS transition during hover for 1-to-1 tracking feel, lerping handles smoothing
        card.style.transition = 'none';
        card.style.transform = `perspective(1000px) rotateX(calc(var(--dy) * -25deg)) rotateY(calc(var(--dx) * 25deg)) scale3d(1.03, 1.03, 1.03)`;
        rafId = requestAnimationFrame(updateTransform);
      } else {
        // Snap back to idle via CSS transition
        card.style.setProperty('--dx', '0');
        card.style.setProperty('--dy', '0');
        card.style.transition = 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)';
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;
      const rect = card.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;
      
      // Calculate normalized position: -0.5 to 0.5
      targetX = (clientX - rect.left) / rect.width - 0.5;
      targetY = (clientY - rect.top) / rect.height - 0.5;
    };

    const handleMouseEnter = () => {
      isHovering = true;
      rafId = requestAnimationFrame(updateTransform);
    };

    const handleMouseLeave = () => {
      isHovering = false;
      targetX = 0;
      targetY = 0;
      currentX = 0;
      currentY = 0;
      cancelAnimationFrame(rafId);
      // Run once more to set the idle transform
      updateTransform();
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div 
      ref={cardRef} 
      onClick={onClick}
      className={`orbit-module relative overflow-hidden rounded-[32px] will-change-transform ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        ...style,
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(30px)",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
