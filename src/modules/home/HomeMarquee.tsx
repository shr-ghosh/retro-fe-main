import React from "react";
import Marquee from "react-fast-marquee";
import { Anton as HeadingFont } from "next/font/google";
import { PiStarFourBold } from "react-icons/pi";

const font = HeadingFont({
  subsets: ["latin"],
  weight: ["400"],
});

const MarqueeExample = () => {
  return (
    <section>
      <div className="border border-gray-800 p-2 md:p-4 rounded-sm">
        <Marquee speed={100}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div className="flex items-center justify-center space-x-3 pl-3" key={i}>
              <h1
                className={`bordered-text text-4xl md:text-5xl lg:text-6xl ${font.className}`}
              >
                {`Points are Coming Soon`}
              </h1>
              <PiStarFourBold className="size-5 md:size-10" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default MarqueeExample;
