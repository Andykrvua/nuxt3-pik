<script setup>
import { useModalStore } from "~/store/modal";
import { useCartStore } from "~/store/cart";
import { useStaticStore } from "~/store/static";

const modalStore = useModalStore();
const cartStore = useCartStore();
const staticStore = useStaticStore();

const htmlElDrawerCart = ref(null);
const loading = ref(false);

onClickOutside(htmlElDrawerCart, (event) => closeCartDrawer());

const tryGetCart = async () => {
  loading.value = true;
  let data;
  try {
    data = await $api().cart.getCart();
    cartStore.setCart(data);
    staticStore.setCartData({
      quantity: data?.default?.total?.quantity,
      total: data?.default?.total?.total,
    });
  } catch (error) {
    data = error.data;
    console.log("cartError", data);
  }
  loading.value = false;
};

watch(
  () => modalStore.cart,
  (newValue) => {
    if (newValue) {
      tryGetCart();
    }
  }
);

const closeCartDrawer = () => {
  modalStore.cart = false;
};

const update = async () => {
  tryGetCart();
};
</script>

<template>
  <PopupsDrawer
    :is-open="modalStore.cart"
    :direction="drawerDirection.right"
    class="cart__drawer"
  >
    <div class="scroll-wrapper" ref="htmlElDrawerCart">
      <button class="btn btn-close" @click="closeCartDrawer">
        <BaseIconSvg iconName="close" width="24" height="24" />
      </button>
      <p class="cart__drawer__title">Ваші товари</p>
      <PagesCartCardGrid class="cart__drawer-product-grid" @update="update" />
      <div
        v-if="
          cartStore.cart?.default?.purchases &&
          cartStore.cart?.default?.purchases?.length
        "
        class="cart__right-side cart__drawer-right-side"
      >
        <div class="cart__right-side__total">
          <p>{{ $t("cart.totalV2") }}</p>
          <p class="total">
            {{ cartStore.cart.default?.total?.total }} <span>грн.</span>
          </p>
        </div>
        <button class="btn btn-checkout">{{ $t("cart.btnGoToCart") }}</button>
        <button class="btn btn-checkout btn-close-drawer">
          {{ $t("cart.btnCloseCartDrawer") }}
        </button>
      </div>
    </div>
  </PopupsDrawer>
</template>
