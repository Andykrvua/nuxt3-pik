<script setup>
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const edit = ref(false);
</script>

<template>
  <div>
    <h2 class="subtitle">
      {{ $t("account.blockPaymentTitle") }}
      <button class="btn btn-icon" @click="edit = !edit">
        <BaseIconSvg icon-name="edit" width="20" height="20" />
      </button>
    </h2>
    <transition name="my" mode="out-in">
      <div v-if="edit" class="profile-data-edit">ndndnndnd</div>
      <div v-else class="profile-data">
        <p class="profile-data__label">
          {{ $t("account.blockPaymentMethod") }}
        </p>
        <p>Онлайн-оплата карткою</p>
      </div>
    </transition>
  </div>
</template>
