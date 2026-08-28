import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  density: number;
  size: number;
}

export function SandboxCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;
    let isVisible = false;

    // Mouse state
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120,
      isHovering: false
    };

    const initParticles = () => {
      particlesArray = [];
      const particleCount = 250;
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          density: (Math.random() * 30) + 1,
          size: Math.random() * 1.5 + 0.5
        });
      }
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      // Increase resolution for retina displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      initParticles();
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        const p = particlesArray[i];
        
        // Slowly drift base positions
        p.baseX += p.vx;
        p.baseY += p.vy;
        
        // Bounce bases off walls
        if (p.baseX < 0 || p.baseX > canvas.width) p.vx = -p.vx;
        if (p.baseY < 0 || p.baseY > canvas.height) p.vy = -p.vy;

        ctx.fillStyle = 'rgba(124, 107, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        // Interaction Physics
        if (mouse.isHovering) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            // Repulsion vector
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * p.density;
            const directionY = forceDirectionY * force * p.density;
            
            p.x -= directionX;
            p.y -= directionY;
          } else {
            // Spring back
            if (p.x !== p.baseX) p.x += (p.baseX - p.x) * 0.08;
            if (p.y !== p.baseY) p.y += (p.baseY - p.y) * 0.08;
          }
        } else {
          // Return to base position
          if (p.x !== p.baseX) p.x += (p.baseX - p.x) * 0.08;
          if (p.y !== p.baseY) p.y += (p.baseY - p.y) * 0.08;
        }

        // Connect particles for constellation effect
        for (let j = i; j < particlesArray.length; j++) {
          const p2 = particlesArray[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < 3000) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124, 107, 255, ${0.15 - (distSq / 3000) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!isVisible) return; // Freeze when off-screen
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Observers and Event Listeners
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          animate();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(container);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseEnter = () => mouse.isHovering = true;
    const onMouseLeave = () => mouse.isHovering = false;

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseenter', onMouseEnter);
    canvas.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', handleResize);
    
    // Initial setup
    handleResize();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseenter', onMouseEnter);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full min-h-[250px] overflow-hidden rounded-2xl"
      style={{
        background: "rgba(124,107,255,0.03)",
        border: "1px solid rgba(124,107,255,0.20)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <p className="font-mono-brand text-xs text-white/50 tracking-widest uppercase">
          Interactive Sandbox // Particle Simulation
        </p>
      </div>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-crosshair"
      />
    </div>
  );
}
