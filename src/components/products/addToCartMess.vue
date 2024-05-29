<script setup>
const showCartMessage = ref(false);
</script>

<template>
  <div class="popup-message">
    <div class="popup-message__icon">
      <BaseIconSvg iconName="check" width="16" height="16" />
    </div>
    <div class="texts">
      <p>{{ $t("cart.addToCartMess") }}</p>
      <NuxtLink :to="localePath(linksHelper.cart)">{{
        $t("cart.linkOpenCart")
      }}</NuxtLink>
    </div>
  </div>
</template>
