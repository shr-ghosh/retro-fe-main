import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useCallback,
} from "react";
import SpinCard from "./SpinCard";

const HEIGHT = 4;
const WIDTH = 5;
const MINIMUM_SPINNING_TIME = 5000;
const ANIMATION_DURATION = 150;

export interface NFTSpinProps {
  onSpinComplete?: (index: number) => void;
}

export interface NFTSpinRef {
  handleStart: (index: number) => void;
}

const NFTSpin = forwardRef<NFTSpinRef, NFTSpinProps>(
  ({ onSpinComplete }, ref) => {
    const [gameStartTime, setGameStartTime] = useState(0);
    const [stoppingIndex, setStoppingIndex] = useState(-1);
    const [gameActive, setGameActive] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const totalItems = useMemo(() => 2 * (HEIGHT + WIDTH) - 4, []);

    const handleStart = useCallback(
      (index: number) => {
        if (index < 0 || index >= totalItems) {
          console.error("Invalid index provided to handleStart");
          return;
        }
        setGameActive(true);
        setStoppingIndex(index);
        setGameStartTime(Date.now());
      },
      [totalItems]
    );

    useEffect(() => {
      if (!gameActive) return;

      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % totalItems);
        if (
          Date.now() - gameStartTime > MINIMUM_SPINNING_TIME &&
          stoppingIndex === activeIndex
        ) {
          setGameActive(false);
          onSpinComplete?.(stoppingIndex);
        }
      }, ANIMATION_DURATION);

      return () => clearInterval(interval);
    }, [
      totalItems,
      gameActive,
      gameStartTime,
      stoppingIndex,
      activeIndex,
      onSpinComplete,
    ]);

    useImperativeHandle(ref, () => ({ handleStart }), [handleStart]);

    const items = useMemo(
      () => Array.from({ length: totalItems }),
      [totalItems]
    );

    return (
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${WIDTH}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${HEIGHT}, minmax(0, 1fr))`,
        }}
      >
        {items.map((_, index) => (
          <SpinCard
            key={index}
            active={index === activeIndex}
            size={{ HEIGHT, WIDTH }}
            index={index}
          />
        ))}
      </div>
    );
  }
);

NFTSpin.displayName = "NFTSpin";

export default NFTSpin;