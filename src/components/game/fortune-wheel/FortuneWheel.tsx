"use client";

import React, { forwardRef, useState, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import Wheel from "./Wheel";
import Image from "next/image";

const colors = [
  "#D03A3A", // Red
  "#808080", // Gray
  "#008000", // Green
  "#D03A3A", // Red
  "#808080", // Gray
  "#008000", // Green
  "#D03A3A", // Red
  "#808080", // Gray
  "#008000", // Green
  "#D03A3A", // Red
  "#808080", // Gray
  "#008000", // Green
  "#4B0082", // Indigo
];

const colorWithValue = [
  { color: "#D03A3A", value: "0.8" },
  { color: "#808080", value: "0.9" },
  { color: "#008000", value: "1.0" },
  { color: "#4B0082", value: "0.8" },
];

const SIZE = 300;

const WheelOfFortune = forwardRef((props, ref) => {
  const [rotation, setRotation] = useState(0);

  useImperativeHandle(ref, () => ({
    wheelRotate: handleClick,
  }));

  const handleClick = async () => {
    setRotation((prev) => prev + 810);
  };

  return (
    <div className="relative">
      <motion.div
        className="flex items-center justify-center text-white font-bold m-4"
        initial={{ rotate: 0 }}
        animate={{ rotate: rotation }}
        transition={{ duration: 5, ease: "easeInOut" }}
        style={{ width: SIZE, height: SIZE }}
      >
        <Wheel colors={colors} size={SIZE} />
      </motion.div>
      <Image
        src={"/pin.svg"}
        height={24}
        width={24}
        alt="fortune wheel pin"
        className="z-50 rotate-180 absolute -top-3 left-[9.5rem]"
      />
      <div className="flex gap-2 justify-center">
        {colorWithValue.map((item, index) => {
          return (
            <div
              className="px-3 py-2 text-white font-bold bg-primary border-0 rounded-sm text-sm md:text-base"
              style={{
                borderBottom: `3px solid ${item.color}`,
              }}
              key={index}
            >
              {item.value}
            </div>
          );
        })}
      </div>
    </div>
  );
});

WheelOfFortune.displayName = "WheelOfFortune";

export default WheelOfFortune;
