<script setup>
import { useModalStore } from "~/store/modal";
const modalStore = useModalStore();
</script>

<template>
  <PopupsModal v-model="modalStore.auth" :customClass="'auth-modal'">
    <div class="auth">
      <Tabs
        :tabs="[
          {
            id: 'login',
            name: $t('auth.tabLoginTitle'),
            active: modalStore.authType === 'l',
          },
          {
            id: 'register',
            name: $t('auth.tabRegisterTitle'),
            active: modalStore.authType === 'r',
          },
        ]"
        class="auth-tabs"
      >
        <template #body>
          <div
            id="login"
            class="tab"
            :class="{ active: modalStore.authType === 'l' }"
          >
            <LazyAuthLogin v-if="modalStore.auth" />
          </div>
          <div
            id="register"
            class="tab"
            :class="{ active: modalStore.authType === 'r' }"
          >
            <LazyAuthRegister v-if="modalStore.auth" />
          </div>
        </template>
      </Tabs>
    </div>
  </PopupsModal>
</template>
