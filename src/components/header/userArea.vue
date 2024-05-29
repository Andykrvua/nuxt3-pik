<script setup>
import { useModalStore } from "~/store/modal";
import { useAuthStore } from "~/store/auth";
import { useStaticStore } from "~/store/static";

const staticStore = useStaticStore();
const modalStore = useModalStore();
const authStore = useAuthStore();
const localePath = useLocalePath();
const isDrawerOpen = ref(false);
const shopingCartCount = 18;

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
};

const authHandler = (val) => {
  authStore.isUserAuth
    ? navigateTo({
        path:
          val === "fav"
            ? localePath(linksHelper.userWishlist)
            : localePath(linksHelper.userProfile),
      })
    : modalStore.toggleAuth("l");
};

const cartHandler = () => {
  navigateTo(localePath(linksHelper.cart));
};
</script>

<template>
  <div class="user-area">
    <button class="btn btn-icon btn-person" @click="authHandler">
      <BaseIconSvg iconName="person" width="32" height="32" />
    </button>
    <button
      class="btn btn-icon btn-badge btn-favorite"
      @click="authHandler('fav')"
    >
      <BaseIconSvg iconName="favorite" width="32" height="32" />
      <span v-if="staticStore.favorites" class="badge">{{
        staticStore.favorites
      }}</span>
    </button>
    <button class="btn btn-shopping-cart btn-badge" @click="cartHandler">
      <BaseIconSvg iconName="shopping-cart" width="32" height="32" />
      <span v-if="staticStore.cart.quantity" class="btn-shopping-cart-texts">
        <span class="header__btn-title">{{ $t("header.yourCardTitle") }}</span>
        <span class="header__btn-subtitle"
          >{{ staticStore.cart.total }} грн.</span
        >
      </span>
      <span v-if="staticStore.cart.quantity" class="badge">{{
        staticStore.cart.quantity
      }}</span>
    </button>
  </div>
</template>
