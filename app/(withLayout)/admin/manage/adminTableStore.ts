import { UserType } from "@/types/user";
import { create } from "zustand";

type AdminConfirmationStore = {
  adminSelected?: UserType;
  isConfirm: boolean;
  openConfirm: (admin: UserType) => void;
  closeConfirm: () => void;
};

const useAdminConfirmationStore = create<AdminConfirmationStore>()((set) => ({
  adminSelected: undefined,
  isConfirm: false,
  openConfirm: (admin: UserType) =>
    set((state) => ({ adminSelected: admin, isConfirm: true })),
  closeConfirm: () =>
    set((state) => ({ adminSelected: undefined, isConfirm: false })),
}));

export default useAdminConfirmationStore;
