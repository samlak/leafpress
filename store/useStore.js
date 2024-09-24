import { create } from 'zustand';

const useStore = create((set) => ({
  userData: null,
  plan: null,
  customerPortalUrl: "",
  setCustomerPortalUrl: (customerPortalUrl) => set({ customerPortalUrl }),
  setPlan: (plan) => set({ plan }),
  setUserData:  (user) => set({ userData: user }),
}));

export default useStore;