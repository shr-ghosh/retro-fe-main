import { PiCoinsDuotone } from "react-icons/pi";
import { GiPerspectiveDiceOne } from "react-icons/gi";
import { GiCartwheel } from "react-icons/gi";
import { PiSpinnerBold } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { ResourceType as GameID } from "./resource";

export type GameHeadingType = {
  title: string;
  description: string;
};

export interface GameData {
  name: string;
  icon: React.ReactNode;
  href: string;
  active: boolean;
  id: GameID | string; // string will be removed
  poster: string;
}

const games: GameData[] = [
  {
    id: "coin_flip",
    name: "Coin Flip",
    icon: <PiCoinsDuotone size={16} />,
    href: "/coin-flip",
    active: true,
    poster: "/posters/coin-flip.webp",
  },
  {
    name: "Dice Roll",
    icon: <GiPerspectiveDiceOne size={16} />,
    href: "/dice-roll",
    active: true,
    id: "dice_roll",
    poster: "/posters/dice-roll.webp",
  },
  {
    name: "Fortune Wheel",
    icon: <GiCartwheel />,
    href: "/fortune-wheel",
    active: true,
    id: "fortune_wheel",
    poster: "/posters/fortune-wheel.webp",
  },
  {
    name: "NFT Spin",
    icon: <PiSpinnerBold />,
    href: "/nft-spin",
    active: false,
    id: "nft_spin",
    poster: "/posters/nft-spin.webp",
  },
  {
    name: "Plinko",
    icon: <GoDotFill />,
    href: "/plinko",
    active: true,
    id: "plinko",
    poster: "/posters/plinko.webp",
  },
];

export const game_heading = {
  coin_flip: {
    title: "Coin Flip",
    description:
      "Coin Flip is a fun, quick game where players predict the outcome of a coin toss: heads or tails. Each correct guess earns points, aiming to score as high as possible. Ideal for all ages, it offers simple, exciting gameplay, perfect for both solo play and friendly competition.",
  },
  fortune_wheel: {
    title: "Fortune Wheel",
    description:
      "Fortune Wheel is an exciting game where players spin a colorful wheel divided into various segments, each representing a prize or outcome. Players place their bets on where the wheel will stop, adding a thrilling element of chance and strategy. It's a perfect game for parties and gatherings.",
  },
  dice_roll: {
    title: "Dice Roll",
    description:
      "Dice Roll is a classic game where players roll one or more dice to achieve the highest score or specific combinations. With its simple rules and endless variations, Dice Roll is great for all ages and offers a mix of luck and strategy, making every roll exciting.",
  },
  plinko: {
    title: "Plinko",
    description:
      "Plinko is a thrilling game where players drop a disc from the top of a peg-filled board, watching it bounce and tumble to the bottom. The goal is to land the disc in the highest-scoring slot. Plinko combines luck and anticipation, making it a crowd favorite at carnivals and game shows.",
  },
  nft_spin: {
    title: "NFT Spin",
    description:
      "NFT Spin is an innovative game that combines digital art collectibles with chance. Players spin a virtual wheel featuring various NFT artworks. Landing on an NFT grants the player ownership of that unique digital asset. It's an exciting way to build an NFT collection while enjoying the thrill of a spin game.",
  },
};

export const gameIds = games.map((game) => game.id);

export default games;
