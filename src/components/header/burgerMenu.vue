<script setup>
import { useModalStore } from "~/store/modal";
import { useAuthStore } from "~/store/auth";
import { useStaticStore } from "~/store/static";

const staticStore = useStaticStore();
const modalStore = useModalStore();
const authStore = useAuthStore();
</script>

<template>
  <div class="burger-wrapper">
    <UserAccountNav v-if="modalStore.accountMenu" />
    <div v-if="!modalStore.mobileCatalogMenu && !modalStore.accountMenu">
      <HeaderBurgerMenuUser />
      <HeaderBurgerMenuNavigation>
        <template #account>
          <li v-if="authStore.isUserAuth">
            <NuxtLink
              no-prefetch
              class="menu-link menu-link-strong user-auth-desktop"
              :to="localePath(linksHelper.userProfile)"
              >{{ $t("header.linkUserCab") }}</NuxtLink
            >
            <button
              @click="modalStore.accountMenu = true"
              class="btn menu-link menu-link-strong user-auth-mobile"
              :to="localePath(linksHelper.userProfile)"
            >
              {{ $t("header.linkUserCab") }}
            </button>
          </li>
        </template>
      </HeaderBurgerMenuNavigation>
      <div class="phones" v-if="staticStore.phones">
        <hr />
        <div class="phones__content">
          <p class="phones__content__title">
            {{ $t("header.phoneBlockTitle") }}
          </p>

          <ul>
            <li v-for="phone in staticStore.phones" :key="phone.number">
              <a
                class="phones__content__item"
                :href="`tel:${cleanedPhone(phone.number)}`"
                >{{ phone.number }}</a
              >
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <HeaderLangSwitcher />
    </div>
    <ClientOnly>
      <HeaderBurgerMenuMobileCatalog v-if="modalStore.mobileCatalogMenu" />
    </ClientOnly>
  </div>
</template>
