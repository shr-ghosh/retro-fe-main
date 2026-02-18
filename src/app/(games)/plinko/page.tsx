"use client";

import React, { useRef } from "react";
import usePlay from "@/hooks/game";
import Game from "@/components/Game";
import Main from "@/components/basic/Main";
import Plinko from "@/components/game/plinko/Plinko";
import Dropdown from "@/components/basic/Dropdown";
import { PlinkoMatterRef } from "@/components/game/plinko/PlinkoMatter";

const MOUNT_PER_BALL = "100000000000";
const NUM_OF_BALL = "1";
const GAME_ID = "plinko";
const CHANCES_OPTIONS = Array.from({ length: 9 }, (_, i) => (i + 1).toString());

const Page = () => {
  const gameRef = useRef<PlinkoMatterRef>(null);
  const { triggerGame, reward, claimRewards, changeGameArguments } = usePlay(
    GAME_ID,
    [MOUNT_PER_BALL, NUM_OF_BALL]
  );

  const handleClaimRewards = async () => {
    const response = await claimRewards();
    console.log(response);
    // console.log(gameArguments)
  };

  const handlePlayClick = async () => {
    const gameResponse = await triggerGame();

    console.log(gameResponse);

    if (gameResponse.length > 0) {
      const gamePaths = gameResponse.map((path) =>
        path.data.ball_path.map((p) => parseInt(p as string))
      );
      gameRef.current?.setPreDefinedPaths(gamePaths);
    }
  };

  return (
    <Main>
      <Game.Root game={GAME_ID}>
        <Game.Sidebar>
          <p>{reward?.rewards_balance.value}</p>
          <Dropdown
            options={CHANCES_OPTIONS}
            onOptionSelect={(opt) => {
              changeGameArguments(CHANCES_OPTIONS[opt], 1);
            }}
            defaultSelectedOption={0}
            label="Chances"
            about="The number of chances you have to win the game."
          />
          <button onClick={handlePlayClick}>Play</button>
          <button onClick={handleClaimRewards}>Claim Rewards</button>
        </Game.Sidebar>
        <Game.UI>
          <Plinko ref={gameRef} />
        </Game.UI>
      </Game.Root>
    </Main>
  );
};

export default Page;
