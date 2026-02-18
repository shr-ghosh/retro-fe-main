import games from "./games";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineLeaderboard, MdSupport, MdMenuBook } from "react-icons/md";
import { FaTelegram, FaXTwitter } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";

export const TWITTER_HREF = "/twitter";
export const TELEGRAM_HREF = "/telegram";

const homeOptions = [
  {
    name: "Home",
    href: "/",
    icon: <IoHomeOutline />,
    active: true,
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: <MdOutlineLeaderboard />,
    active: false,
  },
  {
    name: "Airdrop",
    href: "/airdrop",
    icon: <BiSolidOffer />,
    active: false,
  },
];

export const socialOptions = [
  {
    name: "X/Twitter",
    href: TWITTER_HREF,
    icon: <FaXTwitter />,
    active: true,
  },
  {
    name: "Telegram",
    href: TELEGRAM_HREF,
    icon: <FaTelegram />,
    active: true,
  },
  // {
  //   name: "Discord",
  //   href: "/discord",
  //   icon: <FaDiscord />,
  // },
];

const otherOptions = [
  {
    name: "Terms & Conditions",
    href: "/policy/terms",
    icon: <MdMenuBook />,
    active: true,
  },
  {
    name: "Support",
    href: "/support/help-center",
    icon: <MdSupport />,
    active: true,
  },
];

const navbars = [
  {
    heading: "Dashboard",
    options: homeOptions,
    expantion: false,
    expantionState: true,
    sitemapPriority: 1,
  },
  {
    heading: "Games",
    expantion: true,
    expantionState: false,
    options: games.map((item) => {
      return {
        name: item.name,
        icon: item.icon,
        href: item.href,
        active: item.active,
      };
    }),
    sitemapPriority: 0.7,
  },
  {
    heading: "Socials",
    options: socialOptions,
    expantion: false,
    expantionState: true,
    sitemapPriority: 0,
  },
  {
    heading: "Others",
    options: otherOptions,
    expantion: false,
    expantionState: true,
    sitemapPriority: 0.5,
  },
];

export const expantionState = navbars.map((item) => item.expantionState);

export default navbars;
