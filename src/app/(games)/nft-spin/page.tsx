"use client";

import React, { useRef } from "react";
import Game from "@/components/Game";
import { useToast } from "@/components/basic/Toast";
import Main from "@/components/basic/Main";
import NFTSpin, { NFTSpinRef } from "@/components/game/NFTSpin/NFTSpin";

const GAME_ID = "nft_spin";

const Page: React.FC = () => {
  const { addToast } = useToast();
  const ref = useRef<NFTSpinRef>(null);

  const handlePlayClick = () => {
    ref.current?.handleStart(10);
  };

  return (
    <Main>
      <Game.Root>
        <Game.Sidebar>
          <button onClick={handlePlayClick}>Start Game</button>
          <button onClick={() => addToast("This is a success message", "success")}>
            Show Success Toast
          </button>
          <button onClick={() => addToast("This is an error message", "error")}>
            Show Error Toast
          </button>
          <button onClick={() => addToast("This is an info message", "info")}>
            Show Info Toast
          </button>
        </Game.Sidebar>
        <Game.UI>
          <NFTSpin ref={ref} />
        </Game.UI>
      </Game.Root>
    </Main>
  );
};

export default Page;