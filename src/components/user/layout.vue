<script setup>
import { useAuthStore } from "~/store/auth";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

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
  <main class="page user-account">
    <div class="user-account__layout">
      <UserAccountNav />
      <div class="user-account__content container">
        <slot />
      </div>
    </div>
  </main>
</template>
