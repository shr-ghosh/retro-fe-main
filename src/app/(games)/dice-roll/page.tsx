"use client";

import { useRef, useState } from "react";
import Game from "@/components/Game";
import DiceRoll from "@/components/game/Diceroll";
import usePlay from "@/hooks/game";
import Dropdown from "@/components/basic/Dropdown";
import Main from "@/components/basic/Main";
import Input from "@/components/basic/Input";
import { validateNumberString } from "@/utils/alert";
import { useToast } from "@/components/basic/Toast";

const CHANCES_OPTIONS = Array.from({ length: 10 }, (_, i) =>
  (i + 1).toString()
);
const GAME_ID = "dice_roll";

const Page = () => {
  const { addToast } = useToast();
  const {
    configData,
    gameArguments,
    changeGameArguments,
    triggerGame,
    reward,
    claimRewards,
  } = usePlay(GAME_ID, [
    50,
    [
      "100000000000",
      "100000000000",
      "100000000000",
      "100000000000",
      "100000000000",
      "100000000000",
      "100000000000",
      "100000000000",
    ],
    1,
  ]);

  const handlePlayClick = async () => {
    if (!configData) {
      addToast("Game is Not Started", "error");
      return;
    }
    const validate = validateNumberString(
      parseInt(gameArguments[1]),
      configData?.min_bet_amount as string,
      configData?.max_bet_amount as string
    );

    if (validate.error) {
      addToast(validate.error, "error");
      return;
    }

    if (validate.warning) {
      addToast(validate.warning, "error");
      return;
    }

    const gameResponse = await triggerGame();

    console.log("Game Response", gameResponse);

    if (gameResponse.length > 0 && gameResponse[0].data) {
      const result = gameResponse[0].data;

      console.log("Game Result", result);
    }
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
              changeGameArguments(CHANCES_OPTIONS[opt], 2);
            }}
            defaultSelectedOption={0}
            label="Chances"
            about="Number of Rolls"
          />
          {Array.from({ length: gameArguments[2] }).map((_, index: number) => (
            <Input
              value={gameArguments[1]}
              onChange={(e) => {}}
              type="number"
              placeholder="Enter the Amount"
              label="Amount"
              about="Amount to bet"
              key={index}
            />
          ))}

          <button onClick={handlePlayClick}>Play</button>
          <p>{reward?.rewards_balance.value}</p>
          <button onClick={handleClaimRewards}>Claim Rewards</button>
        </Game.Sidebar>
        <Game.UI>
          <DiceRoll
            value={gameArguments[0]}
            onChange={(val) => changeGameArguments(val, 0)}
          />
        </Game.UI>
      </Game.Root>
    </Main>
  );
};

export default Page;
