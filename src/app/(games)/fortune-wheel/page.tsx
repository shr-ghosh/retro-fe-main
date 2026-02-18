"use client";

import React, { useRef } from "react";
import WheelOfFortune from "@/components/game/fortune-wheel/FortuneWheel";
import usePlay from "@/hooks/game";
import Game from "@/components/Game";
import Dropdown from "@/components/basic/Dropdown";
import Main from "@/components/basic/Main";

const CHANCES_OPTIONS = Array.from({ length: 9 }, (_, i) => (i + 1).toString());
const GAME_ID = "fortune_wheel";

const WheelOfFortunePage: React.FC = () => {
  const {
    gameArguments,
    changeGameArguments,
    configData,
    triggerGame,
    reward,
    claimRewards,
  } = usePlay(GAME_ID, ["1"]);
  const wheelRef = useRef<{ wheelRotate: () => void }>(null);

  const handlePlayClick = async () => {
    const gameResponse = await triggerGame();

    console.log(gameResponse);
    // wheelRef.current?.wheelRotate();
  };

  const handleClaimRewards = async () => {
    const response = await claimRewards();
    console.log(response);
    // console.log(gameArguments)
  };

  return (
    <Main>
      <Game.Root game={GAME_ID}>
        <Game.Sidebar>
          <Dropdown
            options={CHANCES_OPTIONS}
            onOptionSelect={(opt) => {
              changeGameArguments(CHANCES_OPTIONS[opt], 0);
              console.log(gameArguments);
            }}
            defaultSelectedOption={0}
            label="Chances"
            about="The number of chances you have to win the game."
          />
          <button onClick={handlePlayClick} disabled={!configData?.active}>
            Spin
          </button>
          <button onClick={handleClaimRewards}>Claim Rewards</button>
          {reward && reward.coin.value !== 0 && (
            <Game.SideBottom>
              <p>{String(reward?.coin.value)}</p>
              <button onClick={handleClaimRewards} className="claim-reward">
                Claim Rewards
              </button>
            </Game.SideBottom>
          )}
        </Game.Sidebar>
        <Game.UI>
          <WheelOfFortune ref={wheelRef} />
        </Game.UI>
      </Game.Root>
    </Main>
  );
};

export default WheelOfFortunePage;
