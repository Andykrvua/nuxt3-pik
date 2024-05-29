<script setup>
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const edit = ref(false);
</script>

<template>
  <div class="user-account user-account__profile">
    <h1 class="title">{{ $t("account.pageNameProfile") }}</h1>
    <UserProfilePersData />
    <UserProfileEntity />
    <UserProfileDelivery />
    <UserProfilePayment />
    <UserProfileChangePass />
    <div>
      <pre>Auth: {{ authStore.isUserAuth }}</pre>
      <pre>userData: {{ authStore.userData }}</pre>
    </div>
  </div>
</template>
