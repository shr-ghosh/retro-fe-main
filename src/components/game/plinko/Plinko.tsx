import React, { useState, forwardRef } from "react";
import { useScale } from "@/hooks/plinko";
import PlinkoMatter, { PlinkoMatterRef } from "./PlinkoMatter";

const worldWidth = 600;

const Plinko = forwardRef<PlinkoMatterRef, {}>((props, ref) => {
  const { scale, ref: containerRef } = useScale();

  return (
    <div className="flex justify-center w-full">
      <div ref={containerRef} className="relative max-w-full">
        <div
          className="w-full flex justify-center items-center overflow-hidden "
          style={{ height: 600 * scale }}
        >
          <div
            className="flex justify-center items-center origin-center w-full"
            style={{
              transform: `scale(${scale}) translateX(22px)`,
            }}
          >
            <PlinkoMatter worldWidth={worldWidth} ref={ref} />
          </div>
        </div>
      </div>
    </div>
  );
});

Plinko.displayName = "Plinko";

export default Plinko;
