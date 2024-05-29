import { useModalStore } from "~/store/modal";

export default defineNuxtRouteMiddleware(async (to) => {
  const modalStore = useModalStore();
  modalStore.closeAllModal();
});
