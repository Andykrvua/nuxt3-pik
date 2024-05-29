import { useAuthStore } from "~/store/auth";

export const getProfile = async () => {
  const authStore = useAuthStore();
  authStore.loading = true;
  let data;
  try {
    data = await $api().profile.getProfile();
  } catch (error) {
    data = error.data;
  }

  if (!data && data.errors) {
    await authStore.logOut();
    console.log("dataErr", data);
  } else {
    console.log("dataSucc", data);
    authStore.setUserdata({
      ...data.data,
    });
  }

  authStore.loading = false;
};
