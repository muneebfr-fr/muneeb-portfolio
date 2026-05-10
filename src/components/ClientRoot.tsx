"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import SmoothScrollProvider from "./SmoothScrollProvider";
import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Projects from "./Projects";
import Security from "./Security";
import Experience from "./Experience";
import Stack from "./Stack";
import Contact from "./Contact";

export default function ClientRoot() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      <AnimatePresence>
        {loaded && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <SmoothScrollProvider>
              <CustomCursor />
              <ScrollProgress />
              <Navbar />
              <main>
                <Hero />
                <Projects />
                <Security />
                <Experience />
                <Stack />
                <Contact />
              </main>
            </SmoothScrollProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
