"use client";

import React from "react";
import SizedImage from "@/components/basic/SizedImage";

const AirdropBanners = () => {
  return (
    <section className="flex gap-4 flex-col md:flex-row">
      <div className="relative">
        <SizedImage src={"/banners/estimation.webp"} alt="Welcome Banner" />
        <span className="text-7xl!">
          $5000
        </span>
      </div>
      <div className="relative">
        <SizedImage src={"/banners/estimation.webp"} alt="Welcome Banner" />
        <span className="text-7xl!">
          $5000
        </span>
      </div>
    </section>
  );
};

export default AirdropBanners;
