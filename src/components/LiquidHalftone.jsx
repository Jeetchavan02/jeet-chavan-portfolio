import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const vertex = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;

  // Simple 3D noise function
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    
    // Scale and animation speed
    vec2 pos = uv * 2.5; 
    float time = uTime * 0.15;
    
    // Domain warping
    float q = snoise(vec3(pos, time));
    float r = snoise(vec3(pos + vec2(q * 1.5), time * 1.2));
    float val = snoise(vec3(pos + r * 2.5, time * 1.5));
    
    // Normalize noise from [-1, 1] to [0, 1]
    val = val * 0.5 + 0.5;
    
    // Create sharp metallic bands
    float band = smoothstep(0.4, 0.5, val) - smoothstep(0.5, 0.6, val);
    float highlight = smoothstep(0.7, 0.8, val);
    
    float brightness = val + band * 0.8 + highlight * 0.5;
    
    // Color palette based on the image
    vec3 colDark = vec3(0.0, 0.0, 0.02); // Almost black
    vec3 colMid = vec3(0.1, 0.02, 0.3);  // Dark purple
    vec3 colLight = vec3(0.3, 0.1, 0.6); // Muted purple
    vec3 colWhite = vec3(0.5, 0.4, 0.8); // Muted highlight
    
    vec3 color = mix(colDark, colMid, smoothstep(0.0, 0.4, brightness));
    color = mix(color, colLight, smoothstep(0.4, 0.7, brightness));
    color = mix(color, colWhite, smoothstep(0.7, 1.0, brightness));
    
    // Halftone / Dither pattern
    float dotSize = 2.5; // pixel size of the dots
    vec2 center = floor(gl_FragCoord.xy / dotSize) * dotSize + dotSize * 0.5;
    float dist = length(gl_FragCoord.xy - center);
    
    // Determine dot radius based on brightness (darker = smaller dots or inverted)
    float luma = dot(color, vec3(0.299, 0.587, 0.114));
    
    // We want the characteristic halftone look
    // A simple crosshatch or threshold screen works well
    float pattern = sin(gl_FragCoord.x * 2.0) * sin(gl_FragCoord.y * 2.0);
    
    // Mix the pattern into the color for that textured CRT/retro look
    float dither = step(pattern * 0.5 + 0.5, luma);
    
    // Combine base color with dither overlay to match the image texture
    vec3 finalColor = color * (0.6 + 0.4 * dither);
    
    // Add subtle vignette
    float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv - 0.5));
    finalColor *= vignette;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function LiquidHalftone({ className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const renderer = new Renderer({ alpha: true, dpr: window.devicePixelRatio });
    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [gl.canvas.width, gl.canvas.height] },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
    }
    window.addEventListener('resize', resize);
    resize();

    let animationId;
    function update(t) {
      animationId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    }
    animationId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && gl.canvas.parentNode) {
        containerRef.current.removeChild(gl.canvas);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1
      }}
    />
  );
}
