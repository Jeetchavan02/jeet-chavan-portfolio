import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';
import { CSS3DRenderer, CSS3DObject } from 'three-stdlib';
import { GUI } from 'lil-gui';
import gsap from 'gsap';
import { useTheme } from "../lib/ThemeContext";
import { MacOSDesktop, ProjectData } from "./MacOSDesktop";
import { motion, AnimatePresence } from 'framer-motion';

const projects: ProjectData[] = [
  {
    id: '1',
    title: 'AutoFair',
    tech: ['React', 'Node.js', 'OCR', 'GPS'],
    desc: 'OCR + GPS-based system to detect auto-rickshaw overcharging and generate evidence for complaints. Built under HOD mentorship with RTO consultation for regulatory accuracy.',
    image: '/projects/autofair.png',
    link: 'https://github.com/SanikaLobo/Autofair_TISD'
  },
  {
    id: '2',
    title: 'Aegis Intel',
    tech: ['Python', 'Naive Bayes', 'Groq LLM'],
    desc: 'Solo-built claim verification engine combining Naive Bayes + Groq LLM to produce a 0–100 credibility score. Deterministic vote-trace architecture classifies content as Verified / Suspicious / Manipulated.',
    image: '/projects/aegis.jpg',
    link: '#'
  },
  {
    id: '3',
    title: 'SenseAll',
    tech: ['MediaPipe', 'Roboflow', 'React'],
    desc: 'Multimodal platform supporting ISL recognition (18 gestures) speech-to-text, Braille, and haptics. Browser-based inference via MediaPipe + Roboflow CNN fallback for privacy and low latency.',
    image: '/projects/senseall-light.png',
    imageDark: '/projects/senseall-dark.png',
    link: 'https://github.com/SanikaLobo/SenseAll'
  },
];

export function ProjectsSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cssContainerRef = useRef<HTMLDivElement>(null);
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectData | null>(projects[0]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          setActiveProject(projects[index]);
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px' });

    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [projects.length]);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Globals
    const canvasEl = canvasRef.current;
    
    let mainTl: gsap.core.Timeline;
    let laptopAppearTl: gsap.core.Timeline;
    let laptopOpeningTl: gsap.core.Timeline;
    let screenOnTl: gsap.core.Timeline;
    let floatingTl: gsap.core.Timeline;
    
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let cssRenderer: CSS3DRenderer;
    let orbit: OrbitControls;
    let screenHtmlDiv: HTMLElement;
    let darkPlasticMaterial: THREE.MeshStandardMaterial;
    let cameraMaterial: THREE.MeshBasicMaterial;
    let baseMetalMaterial: THREE.MeshStandardMaterial;
    let logoMaterial: THREE.MeshBasicMaterial;
    let screenMaterial: THREE.MeshBasicMaterial;
    let keyboardMaterial: THREE.MeshBasicMaterial;
    let macGroup: THREE.Group;
    let lidGroup: THREE.Group;
    let bottomGroup: THREE.Group;
    let screenMesh: THREE.Mesh;
    let lightHolder: THREE.Group;
    let screenLight: THREE.RectAreaLight;
    let screenImageTexture: THREE.Texture;
    
    let openingControl: any;
    let contentScrollControl: any;
    let gui: GUI | null = null;
    let reqFrameId: number;
    let isCleanedUp = false;

    const controlParams = {
        openingProgress: 0
    }
    const screenSize = [29.4, 20];

    // =======================================================
    // Start the app

    initScene();
    createMaterials();

    const modelLoader = new GLTFLoader();
    modelLoader.load(
        "https://ksenia-k.com/models/mac-noUv.glb",
        glb => {
            if (isCleanedUp) return;
            parseModel(glb);
            addScreen();
            addKeyboard();
            createControls();
            createTimelines();
            
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    mainTl.restart();
                } else {
                    mainTl.pause(0);
                    if (cssRenderer) cssRenderer.domElement.style.pointerEvents = 'none';
                }
            }, { threshold: 0.3 });
            observer.observe(canvasEl);

            render();
            updateSceneSize();
            window.addEventListener("resize", updateSceneSize);
        });

    // =======================================================
    // Three.js stuff

    function initScene() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 10, 1000);
        camera.position.z = 60; // Zoomed out to fit the half-width container perfectly

        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            canvas: canvasEl
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        cssRenderer = new CSS3DRenderer();
        cssRenderer.domElement.style.position = 'absolute';
        cssRenderer.domElement.style.top = '0px';
        cssRenderer.domElement.style.pointerEvents = 'none';
        if (cssContainerRef.current) {
            cssContainerRef.current.appendChild(cssRenderer.domElement);
        }

        const ambientLight = new THREE.AmbientLight(0xffffff, .2);
        scene.add(ambientLight);

        lightHolder = new THREE.Group();
        scene.add(lightHolder);
        const light = new THREE.PointLight(0xFFF5E1, .8);
        light.position.set(0, 5, 50);
        lightHolder.add(light);

        orbit = new OrbitControls(camera, renderer.domElement);
        orbit.minDistance = 25;
        orbit.maxDistance = 120;
        orbit.enablePan = false;
        orbit.enableZoom = false;
        orbit.enableRotate = false;
        orbit.enableDamping = true;

        macGroup = new THREE.Group();
        macGroup.position.z = -10;
        scene.add(macGroup);
        lidGroup = new THREE.Group();
        macGroup.add(lidGroup);
        bottomGroup = new THREE.Group();
        macGroup.add(bottomGroup);
    }

    function updateSceneSize() {
        if (isCleanedUp) return;
        const container = canvasEl.parentElement;
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        cssRenderer.setSize(width, height);
    }

    function createMaterials() {
        const textLoader = new THREE.TextureLoader();
        screenImageTexture = textLoader.load("/purple-wallpaper.jpg", tex => {
            tex.flipY = false;
            tex.wrapS = THREE.RepeatWrapping;
            tex.repeat.y = tex.image.width / tex.image.height / screenSize[0] * screenSize[1];
        })

        screenMaterial = new THREE.MeshBasicMaterial({
            map: screenImageTexture,
            transparent: true,
            opacity: 0,
            side: THREE.BackSide
        });
        const keyboardTexture = textLoader.load("https://ksenia-k.com/img/threejs/keyboard-overlay.png");
        keyboardMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            alphaMap: keyboardTexture,
            transparent: true,
        });

        darkPlasticMaterial = new THREE.MeshStandardMaterial({
            color: 0x000000,
            roughness: .9,
            metalness: .9,
        });
        cameraMaterial = new THREE.MeshBasicMaterial({
            color: 0x333333
        });
        baseMetalMaterial = new THREE.MeshStandardMaterial({
            color: 0xCECFD3
        });
        logoMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });
    }

    function render() {
        if (isCleanedUp) return;
        orbit.update();
        lightHolder.quaternion.copy(camera.quaternion);
        renderer.render(scene, camera);
        cssRenderer.render(scene, camera);
        reqFrameId = requestAnimationFrame(render);
    }


    // =======================================================
    // Add laptop elements to the scene

    function parseModel(glb: any) {
        [...glb.scene.children].forEach(child => {
            if (child.name === "_top") {
                lidGroup.add(child);
                [...child.children].forEach(mesh => {
                    if (mesh.name === "lid") {
                        mesh.material = baseMetalMaterial;
                    } else if (mesh.name === "logo") {
                        mesh.material = logoMaterial;
                    } else if (mesh.name === "screen-frame") {
                        mesh.material = darkPlasticMaterial;
                    } else if (mesh.name === "camera") {
                        mesh.material = cameraMaterial;
                    }
                })
            } else if (child.name === "_bottom") {
                bottomGroup.add(child);
                [...child.children].forEach(mesh => {
                    if (mesh.name === "base") {
                        mesh.material = baseMetalMaterial;
                    } else if (mesh.name === "legs") {
                        mesh.material = darkPlasticMaterial;
                    } else if (mesh.name === "keyboard") {
                        mesh.material = darkPlasticMaterial;
                    } else if (mesh.name === "inner") {
                        mesh.material = darkPlasticMaterial;
                    }
                })
            }
        });
    }

    function addScreen() {
        screenMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(screenSize[0], screenSize[1]),
            screenMaterial
        )
        screenMesh.position.set(0, 10.5, -.11);
        screenMesh.rotation.set(Math.PI, 0, 0);
        lidGroup.add(screenMesh);

        screenLight = new THREE.RectAreaLight(0xffffff, 0, screenSize[0], screenSize[1]);
        screenLight.position.set(0, 10.5, 0);
        screenLight.rotation.set(Math.PI, 0, 0);
        lidGroup.add(screenLight);

        const darkScreen = screenMesh.clone();
        darkScreen.position.set(0, 10.5, -.111);
        darkScreen.rotation.set(Math.PI, Math.PI, 0);
        darkScreen.material = darkPlasticMaterial;
        lidGroup.add(darkScreen);

        const htmlDiv = document.createElement('div');
        htmlDiv.style.width = '588px'; // 29.4 * 20
        htmlDiv.style.height = '400px'; // 20 * 20
        htmlDiv.style.backgroundColor = 'transparent';
        htmlDiv.style.overflow = 'hidden';
        htmlDiv.style.borderRadius = '12px'; 
        htmlDiv.style.transition = 'opacity 0.5s ease';
        screenHtmlDiv = htmlDiv;

        const cssObject = new CSS3DObject(htmlDiv);
        cssObject.position.set(0, 10.5, -.112); 
        cssObject.rotation.set(0, 0, 0); 
        cssObject.scale.set(1/20, 1/20, 1/20);
        lidGroup.add(cssObject);

        setPortalNode(htmlDiv);
    }

    function addKeyboard() {
        const keyboardKeys = new THREE.Mesh(
            new THREE.PlaneGeometry(27.7, 11.6),
            keyboardMaterial
        )
        keyboardKeys.rotation.set(-.5 * Math.PI, 0, 0);
        keyboardKeys.position.set(0, .045, 7.21);
        bottomGroup.add(keyboardKeys);
    }

    function createTimelines() {
        floatingTl = gsap.timeline({
            repeat: -1,
        })
            .to([lidGroup.position, bottomGroup.position], {
                duration: 1.5,
                y: "+=1",
                ease: "power1.inOut"
            }, 0)
            .to([lidGroup.position, bottomGroup.position], {
                duration: 1.5,
                y: "-=1",
                ease: "power1.inOut"
            })
            .timeScale(0)

        screenOnTl = gsap.timeline({
            paused: true,
        })
            .to(screenMaterial, {
                duration: .1,
                opacity: .96
            }, 0)
            .to(screenLight, {
                duration: .1,
                intensity: 1.5
            }, 0)

        laptopOpeningTl = gsap.timeline({
            paused: true,
            onUpdate: () => {
                controlParams.openingProgress = laptopOpeningTl.progress();
                if(openingControl) openingControl.updateDisplay();
            }
        })
            .from(lidGroup.position, {
                duration: .75,
                z: "+=.5"
            }, 0)
            .fromTo(lidGroup.rotation, {
                duration: 1,
                x: .5 * Math.PI
            }, {
                x: -.2 * Math.PI
            }, 0)
            .to(screenOnTl, {
                duration: .06,
                progress: 1
            }, .05);

        laptopAppearTl = gsap.timeline({
            paused: true
        })
            .fromTo(macGroup.rotation, {
                x: .5 * Math.PI,
                y: .2 * Math.PI
            }, {
                duration: 2,
                x: .05 * Math.PI,
                y: 0.15 * Math.PI // Turned inward towards the left (accordion)
            }, 0)
            .fromTo(macGroup.position, {
                y: -50
            }, {
                duration: 1,
                y: -6 // Lowered slightly
            }, 0)

        mainTl = gsap.timeline({
            defaults: {
                ease: "none"
            }
        })
            .to(laptopAppearTl, {
                duration: 1.5,
                progress: 1
            }, 0)
            .to(laptopOpeningTl, {
                duration: 1,
                progress: .34
            }, .5)
            .to(floatingTl, {
                duration: 1,
                timeScale: 1
            }, 1.5)

        mainTl.eventCallback('onComplete', () => {
            if (cssRenderer) cssRenderer.domElement.style.pointerEvents = 'auto';
            if (screenHtmlDiv) screenHtmlDiv.style.opacity = '1';
        });
        mainTl.eventCallback('onStart', () => {
            if (cssRenderer) cssRenderer.domElement.style.pointerEvents = 'none';
            if (screenHtmlDiv) screenHtmlDiv.style.opacity = '0';
        });
    }

    function createControls() {
        const lilGuiContainer = document.querySelector('.lil-gui-container');
        if (lilGuiContainer) {
            gui = new GUI({ container: lilGuiContainer as HTMLElement });
            gui.hide();
            
            openingControl = gui.add(controlParams, "openingProgress", 0, 1).onChange((v: any) => {
                laptopOpeningTl.progress(v);
            }).name("laptop opening animation")
        }
    }
    
    return () => {
        isCleanedUp = true;
        window.removeEventListener("resize", updateSceneSize);
        if (reqFrameId) cancelAnimationFrame(reqFrameId);
        if (renderer) renderer.dispose();
        if (gui) gui.destroy();
        if (mainTl) mainTl.kill();
        if (laptopAppearTl) laptopAppearTl.kill();
        if (laptopOpeningTl) laptopOpeningTl.kill();
        if (screenOnTl) screenOnTl.kill();
        if (floatingTl) floatingTl.kill();
    }
  }, []);

  const currentIndex = activeProject ? projects.findIndex(p => p.id === activeProject.id) + 1 : 1;
  const total = projects.length;

  return (
    <section id="projects" className={`relative w-full min-h-screen font-sans flex flex-col items-center pt-24 pb-32 transition-colors duration-700 ${isDark ? "bg-[#0A0A0F]" : "bg-[#f5f5f7]"}`}>
      
      {/* Header */}
      <div className="w-full text-center pointer-events-none mb-12 z-10">
        <p className={`font-mono text-xs uppercase tracking-widest mb-1 transition-colors duration-700 ${isDark ? "text-white/40" : "text-[#1d1d1f]/40"}`}>
          0{currentIndex} / 0{total} — Work
        </p>
        <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight transition-colors duration-700 ${isDark ? "text-white" : "text-[#1d1d1f]"}`}>Selected Projects.</h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row gap-12 lg:gap-16 relative items-start pb-[35vh]">
         
         {/* LEFT COLUMN: Interactive Accordion */}
         <div className="w-full lg:w-1/2 flex flex-col gap-4 relative">
         
            {projects.map((p, idx) => {
              const isActive = activeProject?.id === p.id;
              
              return (
                <div 
                  key={p.id}
                  ref={el => itemRefs.current[idx] = el}
                  data-index={idx}
                  onClick={() => {
                    setActiveProject(p);
                    itemRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`relative py-6 sm:py-8 transition-all duration-500 cursor-pointer ${
                    isActive ? 'opacity-100 scale-[1.02]' : 'opacity-60 hover:opacity-90 scale-100'
                  }`}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className={`absolute left-0 top-8 bottom-8 w-[3px] rounded-full ${isDark ? 'bg-white' : 'bg-black'}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  <div className="pl-6 sm:pl-8">
                    <div className="flex justify-between items-center">
                       <h3 className={`text-[32px] font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                         {p.title}
                       </h3>
                       <motion.div
                         animate={{ rotate: isActive ? 180 : 0 }}
                         transition={{ duration: 0.3 }}
                         className={`opacity-50 ${isDark ? 'text-white' : 'text-black'}`}
                       >
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                           <polyline points="6 9 12 15 18 9"></polyline>
                         </svg>
                       </motion.div>
                    </div>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          key="accordion-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex gap-2 flex-wrap mb-4 mt-3">
                             {p.tech.map(t => (
                               <span key={t} className={`text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full ${isDark ? 'bg-white/10 text-white/90' : 'bg-black/5 text-black/70'}`}>
                                 {t}
                               </span>
                             ))}
                          </div>

                          <p className={`text-[17px] font-normal leading-relaxed ${isDark ? 'text-[#A1A1A6]' : 'text-[#86868B]'}`}>
                            {p.desc}
                          </p>
                          <a 
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[15px] font-semibold transition-colors ${
                              isDark 
                                ? 'bg-white text-black hover:bg-white/90' 
                                : 'bg-black text-white hover:bg-black/90'
                            }`}
                          >
                            Launch Project 
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}

            {/* View All Projects Button */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 flex justify-start"
            >
              <a 
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                  isDark 
                    ? 'bg-white text-black hover:bg-white/90' 
                    : 'bg-black text-white hover:bg-black/90'
                }`}
              >
                View all on GitHub
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </motion.div>

         </div>

         {/* RIGHT COLUMN: Sticky 3D Laptop */}
         <div className="w-full lg:w-1/2 lg:sticky lg:top-32 h-[50vh] lg:h-[70vh] relative z-20">
            <div className="w-full h-full relative bg-transparent overflow-hidden">
               <canvas ref={canvasRef} className="w-full h-full block cursor-grab"></canvas>
               <div ref={cssContainerRef} className="absolute inset-0 pointer-events-none z-20"></div>
               
               {/* Custom container for lil-gui so it doesn't break React layout */}
               <div className="lil-gui-container absolute top-4 right-4 z-50"></div>
               
               {/* Render MacOS GUI into the 3D scene */}
               {portalNode && createPortal(<MacOSDesktop activeProject={activeProject} />, portalNode)}
            </div>
         </div>

      </div>

    </section>
  );
}
