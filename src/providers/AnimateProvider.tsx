"use client";

import { AnimatePresence } from "framer-motion";

const AnimateProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence initial={false} mode="wait">
      {children}
    </AnimatePresence>
  );
};

export default AnimateProvider;
