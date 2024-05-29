<script setup>
import * as yup from "yup";
import { useAuthStore } from "~/store/auth";
import { useModalStore } from "~/store/modal";

const config = useRuntimeConfig();

if (process.browser) {
  //js for facebook init
  window.fbAsyncInit = function () {
    FB.init({
      appId: config.public.FACEBOOK_APP_ID,
      oauth: true,
      status: true,
      cookie: true,
      version: config.public.FACEBOOK_APP_VER,
      xfbml: true,
    });
  };
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=${config.public.FACEBOOK_APP_VER}&appId=${config.public.FACEBOOK_APP_ID}&autoLogAppEvents=1`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
}

const authStore = useAuthStore();
const modalStore = useModalStore();

const serverError = ref("");

const tryLogin = async (token) => {
  let data;
  try {
    data = await $api().auth.login({
      email: email2.value,
      password: password2.value,
    });
  } catch (error) {
    data = error.data;
  }

  if (data.errors) {
    console.log("dataErr", data);
    // serverError.value.email = data.errors?.email ? data.errors.email : "";
    // serverError.value.password = data.errors?.password
    //   ? data.errors.password
    //   : "";

    // if (data?.message) {
    //   serverError.value.message = data.message;
    // } else {
    //   serverError.value.message = "Виникла невідома помилка, спробуйте пізніше";
    // }
  } else {
    // if (data.status === "active") {
    //   // login
    //     authStore.setUserdata({
    //   ...data.data.user,
    // });
    // authStore.setToken({
    //   token: data.data.access_token,
    //   expires: data.data.expires_seconds,
    // });
    //   modalStore.toggleAuth();
    // } else {
    //   // send again email code
    // }
    modalStore.toggleAuth();
    console.log("dataSuss", data);
  }
};

const clearServerError = () => {
  serverError.value = "";
};

const facebookLogin = () => {
  FB.login(
    function (response) {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken; //get access token
        console.log("accessToken", accessToken);
      } else {
        //user hit cancel button
        console.log("User cancelled login or did not fully authorize.");
      }
    },
    {
      scope: "email,public_profile",
    }
  );
};
</script>

<template>
  <button class="btn btn-social" @click="facebookLogin">
    <BaseIconSvg icon-name="facebook" width="28" height="28" />
    {{ $t("auth.btnFacebookLogin") }}
  </button>
</template>
