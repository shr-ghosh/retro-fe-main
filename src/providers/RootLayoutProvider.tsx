"use client";

import React from "react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { ToastProvider } from "@/components/basic/Toast";

const RootLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const wallets = [new PetraWallet()];

  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      <ToastProvider>{children}</ToastProvider>
    </AptosWalletAdapterProvider>
  );
};

export default RootLayoutProvider;
