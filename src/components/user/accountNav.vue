<script setup>
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const { t } = useI18n();

const logoutHandler = async () => {
  await authStore.logOut();
};

const nav = [
  {
    url: linksHelper.userProfile,
    name: t("account.pageNameProfile"),
    icon: "userlist",
  },
  {
    url: linksHelper.userOrders,
    name: t("account.pageNameOrders"),
    icon: "shopping-cart",
  },
  {
    url: linksHelper.userWishlist,
    name: t("account.pageNameWishlist"),
    icon: "favorite",
  },
  {
    url: linksHelper.userWaitlist,
    name: t("account.pageNameWaitlist"),
    icon: "time",
  },
];
</script>

<template>
  <div class="user-account__left-column">
    <p class="user-account__left-column__title">
      {{ t("header.linkUserCab") }}
    </p>
    <HeaderBurgerMenuUser class="user-account" />
    <ul class="user-account__nav">
      <li v-for="(navlink, ind) in nav" :key="ind">
        <NuxtLink class="user-account__nav-link" :to="localePath(navlink.url)">
          <BaseIconSvg :icon-name="navlink.icon" width="24" height="24" />
          {{ navlink.name }}
          <BaseIconSvg
            class="user-account__nav-link__arrow-icon"
            iconName="arrow-right"
            width="16"
            height="16"
          />
        </NuxtLink>
      </li>
    </ul>
    <div class="user-account__manager">
      <p class="user-account__manager__title">Ваш персональний менеджер:</p>
      <p class="user-account__manager__data">Ім’я Прізвище</p>
      <a class="user-account__manager__data" href="tel:+380000000000"
        >+38 (000) 000 00 00</a
      >
      <a class="user-account__manager__data" :href="`mailto:chaspik@chaspik.ua`"
        >chaspik@chaspik.ua</a
      >
    </div>
    <button @click="logoutHandler" class="btn logout-btn">
      <BaseIconSvg icon-name="logout" width="20" height="20" />
      {{ t("account.btnLogout") }}
    </button>
  </div>
</template>
