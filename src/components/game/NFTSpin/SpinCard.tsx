import React from "react";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { useWindowWidth } from "@react-hook/window-size";

interface SpinCardProps {
  active: boolean;
  size: { HEIGHT: number; WIDTH: number };
  index: number;
}

const SpinCard = ({ active, size, index }: SpinCardProps) => {
  const screenWidth = useWindowWidth();

  const { HEIGHT, WIDTH } = size;
  const getGridArea = useCallback((index: number) => {
    if (index < WIDTH) {
      return `1 / ${index + 1} / 2 / ${index + 2}`;
    } else if (index < WIDTH + HEIGHT - 1) {
      return `${index - WIDTH + 2} / ${WIDTH} / ${index - WIDTH + 3} / ${
        WIDTH + 1
      }`;
    } else if (index < 2 * WIDTH + HEIGHT - 2) {
      const bottomIndex = index - (WIDTH + HEIGHT - 2);
      return `${HEIGHT} / ${WIDTH - bottomIndex} / ${HEIGHT + 1} / ${
        WIDTH - bottomIndex + 1
      }`;
    } else {
      const leftIndex = index - (2 * WIDTH + HEIGHT - 3);
      return `${HEIGHT - leftIndex} / 1 / ${HEIGHT - leftIndex + 1} / 2`;
    }
  }, [HEIGHT, WIDTH]);

  return (
    <motion.div
      className={`aspect-square rounded-lg border border-gray-400 ${
        active ? "bg-primary" : ""
      }`}
      style={{
        gridArea: getGridArea(index),
        width:
          screenWidth < 900
            ? Math.max(screenWidth / 10, 40)
            : Math.min(screenWidth / 20, 80),
            boxShadow: active ? "0 0 0 2px #fff, 0 0 0 4px #000" : "none"
      }}
      animate={active ? { opacity: 1, scale: 1.1 } : { opacity: 0.5, scale: 1 }}
      transition={{ duration: 0.2, ease: "linear" }}
      role="presentation"
      aria-hidden="true"
    />
  );
};

export default SpinCard;
