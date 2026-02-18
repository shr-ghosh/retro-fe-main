import games from "./games";
import { socialOptions } from "./navbar";

const footer = [
  {
    heading: "Support",
    options: [
      { text: "Support", href: "/support/live" },
      // { text: "Request Games", href: "/support/help-center" },
      { text: "Game Responsibly", href: "/support/game-responsibly" },
    ],
  },
  {
    heading: "Games",
    options: games.map((game) => {
      return {
        text: game.name,
        href: game.href,
      };
    }),
  },
  {
    heading: "Rewards",
    options: [
      { text: "Leaderboard (Coming Soon)", href: "/" },
      { text: "Rewards (Coming Soon)", href: "/" },
      { text: "Affiliate (Coming Soon)", href: "/" },
      { text: "Retro Codes (Coming Soon)", href: "/" },
    ],
  },
  {
    heading: "Community",
    options: socialOptions.map((item) => ({
      text: item.name,
      href: item.href,
    })),
  },
];

export const companyInfo = `
Retro.top, an innovative online gaming platform built on the Aptos Network. At Retro.top, we offer a variety of exciting and engaging games designed to provide endless entertainment and the chance to win amazing rewards. Our platform features popular games such as NFT Spin, Wheel Spin, and Dice Roll, each offering unique gameplay experiences and opportunities for fun.

To participate in these games and unlock rewards, you will need tokens. Tokens are essential for playing any game on Retro.top, and they add an extra layer of excitement as you compete for valuable prizes. Our platform ensures a fair and transparent gaming environment, where everyone has an equal chance to win.

At Retro.top, we prioritize responsible gaming. We encourage all our players to play carefully and with a free, open mind. It's important to remember that while the games are designed for entertainment, they should be enjoyed responsibly. Set limits for yourself, take breaks, and avoid chasing losses. Our goal is to create a fun and enjoyable experience for everyone, and responsible gaming is a key part of that mission.
`;

export default footer;
