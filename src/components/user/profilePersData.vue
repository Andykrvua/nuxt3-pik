<script setup>
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const edit = ref(false);

const editHandler = (val) => {
  edit.value = val;
};
</script>

<template>
  <div>
    <h2 class="subtitle">
      {{ $t("account.blockPersDataTitle") }}
      <button class="btn btn-icon" @click="edit = !edit">
        <BaseIconSvg icon-name="edit" width="20" height="20" />
      </button>
    </h2>
    <transition name="my" mode="out-in">
      <UserProfileEditPersData v-if="edit" @update:value="editHandler" />
      <div v-else class="profile-data">
        <p class="profile-data__label">
          {{ $t("account.blockPersDataNames") }}
        </p>
        <p>
          {{ authStore.userData?.name }} {{ authStore.userData?.lastname }}
          {{ authStore.userData?.surname }}
        </p>
        <p class="profile-data__label">
          {{ $t("account.blockPersDataEmail") }}
        </p>
        <p>{{ authStore.userData?.email }}</p>
        <p class="profile-data__label">
          {{ $t("account.blockPersDataPhone") }}
        </p>
        <p>
          {{
            authStore.userData?.phone
              ? `+380${authStore.userData?.phone}`
              : null
          }}
        </p>
        <template
          v-if="authStore.userData?.company && authStore.userData?.edrpou"
        >
          <p class="profile-data__label">
            {{ $t("auth.inputLabelEntityName2") }}
          </p>
          <p>{{ authStore.userData.company }}</p>
          <p class="profile-data__label">
            {{ $t("auth.inputLabelEntityCode") }}
          </p>
          <p>{{ authStore.userData.edrpou }}</p>
        </template>
      </div>
    </transition>
  </div>
</template>
