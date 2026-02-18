"use client";

import React from "react";
import Modal from "@/components/basic/Modal";
import DailyClaim from "@/components/DailyClaim";
import useDailyClaimModalStore from "@/store/daily-claim";

const DailyClaimModal = () => {
  const { isDailyClaimModalOpen, closeDailyClaimModal } =
    useDailyClaimModalStore();

  return (
    <Modal isOpen={isDailyClaimModalOpen} onClose={closeDailyClaimModal}>
      <DailyClaim />
    </Modal>
  );
};

export default DailyClaimModal;
