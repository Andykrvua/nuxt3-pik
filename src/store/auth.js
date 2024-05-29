export const useAuthStore = defineStore("auth", () => {
  const isUserAuth = ref(false);
  const userData = ref({});
  const loading = ref(false);

  function setUserdata(userObj) {
    isUserAuth.value = true;
    userData.value = { ...userObj };
  }

  function setToken(payload) {
    let secondsToExpire;
    if (payload.expires) {
      secondsToExpire = Math.floor(
        (payload.expires * 1000 - Date.now()) / 1000
      );
    }
    const cookie = useCookie("token", {
      maxAge: secondsToExpire ? secondsToExpire : 3600,
    });
    cookie.value = payload.token;
  }

  async function logOut() {
    let data;
    try {
      data = await $api().auth.logout();
    } catch (error) {
      data = error.data;
    }

    navigateTo("/");
    userData.value = {};
    isUserAuth.value = false;
    const cookie = useCookie("token");
    cookie.value = null;

    console.log("logoutResp", data);
  }

  return {
    isUserAuth,
    loading,
    userData,
    setUserdata,
    setToken,
    logOut,
  };
});
