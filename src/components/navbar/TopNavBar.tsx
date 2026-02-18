"use client";

import React from "react";
import Image from "next/image";
import WalletConnector from "../WalletConnector";
import useDailyClaimModalStore from "@/store/daily-claim";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import CasinoSports from "./CasinoSports";
import Link from "next/link";

const TopNavBar = () => {
  const { openDailyClaimModal } = useDailyClaimModalStore();
  const { connected } = useWallet();

  const LOGO_SIZE = 120;

  return (
    <nav className="bg-primary-light flex items-center border border-x-0 border-gray-800 h-[4.5rem]">
      <CasinoSports />
      <div className="nav-content flex items-center justify-between w-full pl-4 md:pl-0 pr-4">
        <Link href="/">
          <Image
            height={LOGO_SIZE}
            width={LOGO_SIZE}
            alt="logo"
            src={"/logo.svg"}
          />
        </Link>
        <div className="flex gap-2">
          {connected && (
            <button
              className="bg-orange-600 hover:bg-orange-500 hidden md:block"
              onClick={openDailyClaimModal}
            >
              Daily Claim
            </button>
          )}
          <WalletConnector />
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
