import Main from "@/components/basic/Main";
import Games from "@/modules/home/Games";
import HomeSwiper from "@/modules/home/HomeSwiper";
import Marquee from "@/modules/home/HomeMarquee";
import React from "react";

const HomeUI = () => {  
  return (
    <Main>
      <HomeSwiper />
      <Marquee />
      <Games heading="Retro Originals" size={150} />
    </Main>
  );
};

export default HomeUI;
