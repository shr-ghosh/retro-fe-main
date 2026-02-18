"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { TELEGRAM_HREF } from "@/constants/navbar";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

const images = [
  { src: "/banners/welcome.webp", alt: "Welcome Banner", href: "/" },
  {
    src: "/banners/jointelegram.webp",
    alt: "Join Telegram Banner",
    href: TELEGRAM_HREF,
  },
  { src: "/banners/refer.webp", alt: "Refer Banner", href: "/referral" },
];

const HomeSwiper = () => {
  const router = useRouter();
  return (
    <section>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={8}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
        }}
        className="w-full"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index} className="relative">
            <motion.div
              whileHover={{ y: -5 }}
              className="absolute inset-0 overflow-hidden rounded-md"
            >
              <div
                className="aspect-2/1 w-full"
                onClick={() => router.push(item.href)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  placeholder="blur"
                  quality={95}
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                  fill
                />
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HomeSwiper;
