import { useAuthStore } from "~/store/auth";
import { useStaticStore } from "~/store/static";

export const toggleFavorite = async (val) => {
  const authStore = useAuthStore();
  const staticStore = useStaticStore();
  if (!authStore.isUserAuth) return null;

  let data;
  try {
    data = await $api().favorite.toggleFavorite(val);
  } catch (error) {
    data = error.data;
  }

  if (data.errors) {
    console.log("dataErr", data);
    return null;
  } else {
    if (data.result === true) {
      // add to favor
      staticStore.setFavorites(data.result);
    } else if (data.result === false) {
      // del favor
      staticStore.setFavorites(data.result);
    }
    return data;
  }
};
