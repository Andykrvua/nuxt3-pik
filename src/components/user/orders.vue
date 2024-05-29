<script setup>
import { useAuthStore } from "~/store/auth";
import { useStaticStore } from "~/store/static";

const staticStore = useStaticStore();
const authStore = useAuthStore();
</script>

<template>
  <div class="user-account user-account__profile user-account__orders">
    <h1 class="title">{{ $t("account.pageNameOrders") }}</h1>
    <div>
      <!-- <pre>Auth: {{ authStore.isUserAuth }}</pre>
      <pre>userData: {{ authStore.userData }}</pre> -->
      <pre>cart: {{ staticStore.cart }}</pre>
      <pre>favorites: {{ staticStore.favorites }}</pre>
      <pre>menu: {{ staticStore.menu }}</pre>
      <pre>pages_info: {{ staticStore.pages_info }}</pre>
      <pre>pages_legal: {{ staticStore.pages_legal }}</pre>
      <pre>posttypes: {{ staticStore.posttypes }}</pre>
      <pre>phones: {{ staticStore.phones }}</pre>
      <pre>socials: {{ staticStore.socials }}</pre>
      <pre>email: {{ staticStore.email }}</pre>
    </div>
  </div>
</template>
