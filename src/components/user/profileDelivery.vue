<script setup>
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const edit = ref(false);
</script>

<template>
  <div>
    <h2 class="subtitle">
      {{ $t("account.blockDeliveryTitle") }}
      <button class="btn btn-icon" @click="edit = !edit">
        <BaseIconSvg icon-name="edit" width="20" height="20" />
      </button>
    </h2>
    <transition name="my" mode="out-in">
      <div v-if="edit" class="profile-data-edit">ndndnndnd</div>
      <div v-else class="profile-data">
        <p class="profile-data__label">
          {{ $t("account.blockDeliveryMethod") }}
        </p>
        <p>Нова Пошта</p>
        <p class="profile-data__label">{{ $t("account.blockDeliveryCity") }}</p>
        <p>Київ</p>
        <p class="profile-data__label">
          {{ $t("account.blockDeliveryDepartment") }}
        </p>
        <p>№15 (вул. Тараса шевченка, 143)</p>
      </div>
    </transition>
  </div>
</template>
