import Main from "@/components/basic/Main";
import HomeSwiper from "./HomeSwiper";
import Marquee from "./HomeMarquee";
import Games from "./Games";

const HomeScreen = () => {
  return (
    <Main>
      <HomeSwiper />
      <Marquee />
      <Games heading="Retro Originals" size={150} />
    </Main>
  );
};

export default HomeScreen;