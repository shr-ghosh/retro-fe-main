import { useWindowSize } from "@react-hook/window-size";
import { useState, useEffect, useRef, useMemo } from "react";

const MOBILE_BREAKPOINT = 768;
const MATTER_SLIM_HEIGHT = 600;
const MATTER_SLIM_WIDTH = 800;
const BASE_SCALE_MOBILE = 0.8;
const BASE_SCALE_DESKTOP = 1;
const SCALE_ADJUSTMENT = 0.2;

export const useScale = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const [scale, setScale] = useState(1);

  const baseScale = useMemo(() => 
    windowWidth < MOBILE_BREAKPOINT ? BASE_SCALE_MOBILE : BASE_SCALE_DESKTOP,
  [windowWidth]);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const { offsetWidth: containerWidth, offsetHeight: containerHeight } = container;
    const scaleX = containerWidth / MATTER_SLIM_WIDTH;
    const scaleY = containerHeight / MATTER_SLIM_HEIGHT;
    
    const newScale = Math.min(scaleX, scaleY) * baseScale;
    const finalScale = Math.min(newScale + SCALE_ADJUSTMENT, 1);

    setScale(finalScale);
  }, [windowHeight, windowWidth, baseScale]);

  return { scale, ref };
};