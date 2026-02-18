"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import games from "@/constants/games";

interface Game {
  name: string;
  poster: string;
  href: string;
}

interface GameCardProps {
  game: Game;
  onClick: () => void;
  size: number;
}

const GameCard: React.FC<GameCardProps> = React.memo(({ game, onClick, size }) => (
  <motion.div
    className="relative w-full overflow-hidden rounded-lg shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    whileHover={{ y: -5 }}
    onClick={onClick}
  >
    <Image
      alt={game.name}
      src={game.poster}
      className="w-full h-auto"
      height={size}
      width={size}
      quality={90}
      priority
    />
  </motion.div>
));

GameCard.displayName = "GameCard";

const Game = ({
  dailyRewards = true,
  heading,
  size = 120,
}: {
  dailyRewards?: boolean;
  heading: string;
  size?: number
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section>
      <h1>{heading}</h1>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}
      >
        {dailyRewards && (
          <GameCard
            game={{
              name: "Daily Rewards",
              poster: "/posters/daily-rewards.webp",
              href: "",
            }}
            onClick={() => {}}
            size={size}
          />
        )}
        {games.map(
          (game) =>
            pathname !== game.href && (
              <GameCard
                key={game.href}
                game={game}
                onClick={() => router.push(game.href)}
                size={size}
              />
            )
        )}
      </div>
    </section>
  );
};

export default Game;
