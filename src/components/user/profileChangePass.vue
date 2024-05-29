<script setup>
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const edit = ref(false);

const editHandler = (val) => {
  edit.value = val;
};
</script>

<template>
  <div class="change-pass">
    <button class="btn btn-change-pass" @click="edit = !edit">
      <BaseIconSvg icon-name="changepass" width="18" height="18" />
      {{ $t("account.btnChangePassw") }}
    </button>
    <transition name="my" mode="out-in">
      <UserProfileEditChangePass v-if="edit" @update:value="editHandler" />
      <div v-else>
        <p>{{ $t("account.changePasswDescr") }}</p>
      </div>
    </transition>
  </div>
</template>
