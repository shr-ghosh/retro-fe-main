import React from "react";
import lightenColors from "@/utils/color";

interface WheelSegmentProps {
  color: string;
  rotationDegree: number;
  width: number;
}

const WheelSegment: React.FC<WheelSegmentProps> = ({
  color,
  rotationDegree,
  width,
}) => (
  <div
    className="flex justify-center items-center absolute h-[50%] left-[50%] origin-bottom"
    style={{
      width: `${width}px`,
      backgroundColor: color,
      transform: `translateX(-50%) rotate(${rotationDegree}deg)`,
      clipPath: "polygon(100% 0, 50% 100%, 0 0)",
    }}
  />
);

interface WheelProps {
  colors: string[];
  size?: number;
}

const WheelSingle: React.FC<WheelProps> = ({ colors, size = 300 }) => {
  const segmentWidth = (Math.PI * size) / colors.length;
  const segmentAngle = 360 / colors.length;

  return (
    <div
      className="relative overflow-hidden rounded-[50%]"
      style={{ width: size, height: size }}
    >
      {colors.map((color, index) => (
        <WheelSegment
          key={index}
          color={color}
          rotationDegree={index * segmentAngle}
          width={segmentWidth}
        />
      ))}
    </div>
  );
};

interface WheelExampleProps {
  colors: string[];
  size?: number;
}

const Wheel: React.FC<WheelExampleProps> = ({ colors, size = 300 }) => {
  const padding = 20;
  const wheelSizes = [
    { colors: colors },
    { colors: lightenColors(colors, 0.4) },
    { bgColor: "bg-primary" },
    { bgColor: "bg-primary-light" },
  ];

  return (
    <div className="flex items-center justify-center relative">
      {wheelSizes.map((wheel, index) => {
        const currSize = size - index * padding;
        return (
          <div key={index} className="absolute">
            {wheel.colors ? (
              <WheelSingle colors={wheel.colors} size={currSize} />
            ) : (
              <div
                className={`${wheel.bgColor} rounded-full flex justify-center items-center`}
                style={{ height: currSize, width: currSize }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Wheel;
