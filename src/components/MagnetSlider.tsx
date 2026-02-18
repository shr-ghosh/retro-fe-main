import React, { useState, useRef, useEffect } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";

interface MagneticSliderProps {
  initialValue?: number;
  step?: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

const MagneticSlider: React.FC<MagneticSliderProps> = ({
  initialValue = 50,
  step = 5,
  min = 0,
  max = 100,
  onChange,
}) => {
  const [value, setValue] = useState<number>(initialValue);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const updateValue = (clientX: number) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = (clientX - rect.left) / rect.width;
      let newValue = Math.round((percentage * (max - min) + min) / step) * step;
      newValue = Math.max(min, Math.min(max, newValue));
      setValue(newValue);
      onChange(newValue);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    updateValue(e.clientX);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    updateValue(e.clientX);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (thumbRef.current && sliderRef.current) {
      const percentage = (value - min) / (max - min);
      const thumbPosition = percentage * sliderRef.current.offsetWidth;
      thumbRef.current.style.left = `${thumbPosition}px`;
    }
  }, [value, min, max]);

  return (
    <div className="w-[75vw] min-w-[260px] md:min-w-[600px] max-w-md mx-auto p-4">
      <div className="bg-gray-900 p-6 rounded-3xl">
        <div
          ref={sliderRef}
          className="relative h-4 bg-gray-700 rounded-full cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          <div
            className="absolute top-0 left-0 h-full bg-red-500 rounded-full"
            style={{ width: `${((value - min) / (max - min)) * 100}%` }}
          />
          <div
            className="absolute top-0 right-0 h-full bg-green-500 rounded-full"
            style={{ width: `${((max - value) / (max - min)) * 100}%` }}
          />
          <div
            ref={thumbRef}
            className="absolute top-1/2 -translate-y-1/2 -ml-4 w-8 h-8 bg-blue-900 rounded-md flex items-center justify-center"
            style={{ left: `${((value - min) / (max - min)) * 100}%` }}
          >
            <RxDragHandleDots2 className="text-white" size={22} />
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center text-xs md:text-sm text-gray-300 font-semibold">
          {[min, 25, 50, 75, max].map((label) => (
            <div key={label} className="flex flex-col items-center">
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MagneticSlider;