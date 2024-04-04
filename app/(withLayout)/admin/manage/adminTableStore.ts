import { create } from "zustand";
import { AdminAttributes } from "./adminTable";

type AdminConfirmationStore = {
  adminSelected?: AdminAttributes;
  isConfirm: boolean;
  openConfirm: (admin: AdminAttributes) => void;
  closeConfirm: () => void;
};

const useAdminConfirmationStore = create<AdminConfirmationStore>()((set) => ({
  adminSelected: undefined,
  isConfirm: false,
  openConfirm: (admin: AdminAttributes) =>
    set((state) => ({ adminSelected: admin, isConfirm: true })),
  closeConfirm: () =>
    set((state) => ({ adminSelected: undefined, isConfirm: false })),
}));

export default useAdminConfirmationStore;
