"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useWallet,
  WalletName,
} from "@aptos-labs/wallet-adapter-react";
import { useToast } from "./basic/Toast";
import Image from "next/image";
import Modal from "@/components/basic/Modal";

const WalletConnectButton: React.FC = () => {
  const { connected, account, disconnect, connect, wallets } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { addToast } = useToast();

  const truncateAddress = (address: string): string => {
    if (!address) return "Unknown";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnectClick = (): void => {
    if (connected) {
      if (account?.address) {
        navigator.clipboard.writeText(account.address);
        addToast("Address copied to clipboard", "info");
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const handleDisconnect = (): void => {
    disconnect();
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: 5, transition: { duration: 0.2 } },
  };

  const listItemVariants = {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.1 } },
    exit: { opacity: 0, y: 5, transition: { duration: 0.1 } },
  };

  return (
    <div className="flex items-center space-x-2">
      <motion.button
        onClick={handleConnectClick}
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {connected
          ? truncateAddress(account?.address as string)
          : "Connect Wallet"}
      </motion.button>

      <AnimatePresence>
        {connected && (
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={handleDisconnect}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </motion.button>
        )}
      </AnimatePresence>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Connect Wallet</h2>
        <motion.div>
          <AnimatePresence>
            <div className="space-y-1">
              {wallets?.map((wallet) => (
                <motion.div
                  key={wallet.name}
                  variants={listItemVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onClick={() => {
                    connect(wallet.name as WalletName);
                    setIsModalOpen(false);
                  }}
                  className="px-4 py-2 flex items-center gap-2 bg-primary-light rounded-lg cursor-pointer border-2 border-primary hover:border-l-secondary transition-colors"
                >
                  <Image
                    src={wallet.icon}
                    alt={wallet.name}
                    className=""
                    height={20}
                    width={20}
                  />
                  <span>{wallet.name}</span>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </motion.div>
      </Modal>
    </div>
  );
};

export default WalletConnectButton;
