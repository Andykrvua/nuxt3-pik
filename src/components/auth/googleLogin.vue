<script setup>
import * as yup from "yup";
import { useAuthStore } from "~/store/auth";
import { useModalStore } from "~/store/modal";

const authStore = useAuthStore();
const modalStore = useModalStore();
const { t } = useI18n();

const emit = defineEmits(["update:error"]);

const tryLogin = async (token) => {
  let data;
  try {
    data = await $api().auth.socialLogin({
      provider: "google",
      access_token: token,
    });
  } catch (error) {
    data = error.data;
  }

  if (data.status === "fail") {
    console.log("dataErr", data);
    emit("update:error", data.message);
  } else {
    console.log("dataSuss", data);
    if (data.status === "active") {
      authStore.setUserdata({
        ...data.data.user,
      });
      authStore.setToken({
        token: data.data.access_token,
        expires: data.data.expires_seconds,
      });
      modalStore.toggleAuth();
    }
  }
};

const handleLoginSuccess = (response) => {
  if (response.access_token) {
    tryLogin(response.access_token);
  } else {
    console.error("google token null");
  }
};

const handleLoginError = () => {
  console.error("google login failed");
  emit("update:error", t("validate.serverUnknownErrorMess"));
};

const { isReady, login } = useTokenClient({
  onSuccess: handleLoginSuccess,
  onError: handleLoginError,
});
</script>

<template>
  <button class="btn btn-social" :disabled="!isReady" @click="login">
    <BaseIconSvg icon-name="google" width="28" height="28" />
    {{ t("auth.btnGoogleLogin") }}
  </button>
</template>
