import { create } from "zustand";

interface ModalStore {
  isDailyClaimModalOpen: boolean;
  openDailyClaimModal: () => void;
  closeDailyClaimModal: () => void;
}

const useDailyClaimModalStore = create<ModalStore>((set) => ({
  isDailyClaimModalOpen: false,
  openDailyClaimModal: () => set({ isDailyClaimModalOpen: true }),
  closeDailyClaimModal: () => set({ isDailyClaimModalOpen: false }),
}));

export default useDailyClaimModalStore;