import { useEffect } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Work from './components/Work';
import Contact from './components/Contact';
import CursorGlow from './components/CursorGlow';

export default function App() {
  useEffect(() => {
    // Respect the visitor's "reduce motion" setting: keep native scrolling.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    let frame;
    const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen overflow-x-hidden bg-ink text-white">
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <Home />
        <About />
        <Experience />
        <Skills />
        <Work />
        <Contact />
      </main>
    </div>
    </MotionConfig>
  );
}
