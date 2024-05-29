<script setup>
import { useModalStore } from "~/store/modal";
import { useAuthStore } from "~/store/auth";

const modalStore = useModalStore();
const authStore = useAuthStore();
</script>

<template>
  <div class="user-credentials">
    <span class="user-credentials__avatar">
      <template v-if="authStore.isUserAuth">{{
        authStore.userData?.name
          ? authStore.userData?.name[0]
          : authStore.userData?.email[0]
      }}</template>
      <template v-else
        ><BaseIconSvg iconName="person" width="32" height="32"
      /></template>
    </span>
    <div class="user-credentials__texts">
      <p class="user-credentials__name-surname" v-if="authStore.isUserAuth">
        {{
          authStore.userData?.name
            ? authStore.userData?.name
            : authStore.userData?.email
        }}
      </p>
      <div v-else class="btns-auth">
        <button class="btn btn-auth" @click="modalStore.toggleAuth('l')">
          {{ $t("header.btnLogin") }}
        </button>
        |
        <button class="btn btn-auth" @click="modalStore.toggleAuth('r')">
          {{ $t("header.btnRegister") }}
        </button>
      </div>
      <p class="user-credentials__email">
        {{
          authStore.isUserAuth
            ? authStore.userData?.email
            : $t("header.unAuthTitle")
        }}
      </p>
    </div>
    <button class="btn btn-close" @click="modalStore.toggleBurgerMenu">
      <BaseIconSvg iconName="close" width="24" height="24" />
    </button>
  </div>
</template>
