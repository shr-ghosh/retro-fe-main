"use client";

import React, { useRef, useState } from "react";
import CoinToss from "@/components/game/coin-toss/Coin";
import Dropdown from "@/components/basic/Dropdown";
import usePlay from "@/hooks/game";
import Game from "@/components/Game";
import Select from "@/components/basic/Select";
import { CoinTossRef } from "@/components/game/coin-toss/Coin";
import Main from "@/components/basic/Main";
import { validateNumberString } from "@/utils/alert";
import { useToast } from "@/components/basic/Toast";
import InputOptions from "@/components/basic/InputOptions";
import Label from "@/components/basic/Label";

type Answer = 0 | 1;

const GAME_ID = "coin_flip";
const BET_AMOUNT = "100000000000";
const HEAD_TAIL = "0"; // 0-> heads /gui, 1-> tails / fomo
const CHANCES = "1";
const CHANCES_OPTIONS = Array.from({ length: 9 }, (_, i) => (i + 1).toString());

const Page = () => {
  const [alert, setAlert] = useState<string>("");
  const { addToast } = useToast();

  const {
    reward,
    configData,
    gameArguments,
    changeGameArguments,
    triggerGame,
    claimRewards,
  } = usePlay(GAME_ID, [HEAD_TAIL, BET_AMOUNT, CHANCES]);

  const coinTossRef = useRef<CoinTossRef>(null);

  const handlePlayClick = async () => {
    if (!configData) {
      addToast("Game is Not Started", "error");
      return;
    }
    const validate = validateNumberString(
      parseInt(gameArguments[1]),
      configData?.min_bet_amount_heads,
      configData?.max_bet_amount_heads
    );

    if (validate.error) {
      addToast(validate.error, "error");
      return;
    }

    if (validate.warning) {
      setAlert(validate.warning);
      return;
    }

    const gameResponse = await triggerGame();
    console.log("Game Response", gameResponse);

    if (gameResponse.length > 0) {
      const winnerList = gameResponse.map((item) =>
        item.data.is_winner ? 0 : 1
      );
      coinTossRef.current?.setAnswers(winnerList);
      coinTossRef.current?.flipCoins();
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
          {/* Pick Your Side */}
          <Select
            options={["HEAD", "TAIL"]} //add icon
            onOptionSelect={(opt) => {
              changeGameArguments(opt, 0);
            }}
            defaultSelectedOption={parseInt(gameArguments[0])}
            label="Pick Your Side"
          />
          <InputOptions
            value={gameArguments[1]}
            onChange={(e: any) => changeGameArguments(e.target.value, 1)}
            type="number"
            placeholder="Enter the Amount"
            label="Amount"
            about={`Enter the amount you want to bet Min: ${configData?.min_bet_amount_heads}\n Max: ${configData?.max_bet_amount_heads}`}
            alert={alert}
            options={["APT", "GUI", "ZAAP"]}
            onOptionSelect={() => {}}
            defaultSelectedOption={0}
          />

          <Dropdown
            options={CHANCES_OPTIONS}
            onOptionSelect={(opt) => {
              changeGameArguments(CHANCES_OPTIONS[opt], 2);
              console.log(gameArguments);
            }}
            defaultSelectedOption={0}
            label="Chances"
            about="Select the number of chances you want to play"
          />
          <button onClick={handlePlayClick}>Flip Coin</button>
          {reward && reward.rewards_balance.value !== 0 && (
            <Game.SideBottom>
              <p>{String(reward?.rewards_balance.value)}</p>
              <button onClick={handleClaimRewards} className="claim-reward">
                Claim Rewards
              </button>
            </Game.SideBottom>
          )}
        </Game.Sidebar>
        <Game.UI>
          <CoinToss
            onTossComplete={() => {}}
            totalCoins={parseInt(gameArguments[2])}
            ref={coinTossRef}
          />
        </Game.UI>
      </Game.Root>
    </Main>
  );
};

export default Page;
