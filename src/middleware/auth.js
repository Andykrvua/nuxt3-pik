import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const cookieToken = useCookie("token");

  // TODOS: check lang
  if (cookieToken.value) {
    await getProfile();

    if (!authStore.isUserAuth) {
      return navigateTo("/");
    }
  } else {
    return navigateTo("/");
  }
});
