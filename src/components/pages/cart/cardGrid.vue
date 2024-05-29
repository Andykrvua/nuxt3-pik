<script setup>
import { useCartStore } from "~/store/cart";

const props = defineProps({
  // data: {
  //   type: Object,
  //   default: {},
  // },
  update: {
    type: Function,
    default: null,
  },
});

const cartStore = useCartStore();
const emits = defineEmits();

const loading = ref(false);
console.log("productGrid", cartStore.cart);

// const modalStore = useModalStore();
// const nuxtApp = useNuxtApp();
// const route = useRoute();
// const url = useRequestURL();
// const { locale } = useI18n();

// const { data: respSlug, error } = await useAsyncData(
//   () => $api().cart.getCart()
//   // {
//   //   getCachedData(key) {
//   //     return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
//   //   },
//   // }
// );

// console.log("getCart", respSlug.value);

const handleCount = async (val, id) => {
  loading.value = true;
  let data;
  try {
    if (val === "+") {
      data = await $api().cart.addCart({
        id,
        quantity: 1,
      });
    } else if (val === "-") {
      data = await $api().cart.removeCart({
        id,
        quantity: 1,
      });
    }
    emits("update");
  } catch (error) {
    data = error.data;
    console.log("data", data);
  }

  loading.value = false;
};

const removeProduct = async (id, qty) => {
  loading.value = true;
  let data;
  try {
    data = await $api().cart.removeCart({
      id,
      quantity: qty,
    });
    emits("update");
  } catch (error) {
    data = error.data;
    console.log("data", data);
  }

  loading.value = false;
};
</script>

<template>
  <div class="cart__product-grid">
    <p
      v-if="
        !cartStore.cart.default?.purchases &&
        !cartStore.cart.default?.purchases?.length
      "
      class="cart__product-grid__title no-prod-title"
    >
      {{ $t("cart.empty") }}
    </p>
    <template v-else>
      <p class="cart__product-grid__title">{{ $t("cart.products") }}</p>
      <p class="cart__product-grid__title">{{ $t("cart.price") }}</p>
      <p class="cart__product-grid__title">{{ $t("cart.qty") }}</p>
      <p class="cart__product-grid__title">{{ $t("cart.sumV2") }}</p>
    </template>
    <div
      class="cart__product-grid__item"
      v-for="item in cartStore.cart.default?.purchases"
      :key="item.product.id"
    >
      <NuxtLink
        no-prefetch
        :to="localePath(`/${item.product?.slug}`)"
        class="cart__item__descr"
      >
        <NuxtImg
          v-if="item.product.images && item.product.images.length"
          :src="item.product.images[0]?.url || `/images/placeholder-square.svg`"
          loading="lazy"
          :width="108"
          :height="108"
        />
        <NuxtImg
          v-else
          :src="`/images/placeholder-square.svg`"
          loading="lazy"
          :width="108"
          :height="108"
        />
        <div class="cart__item__descr__text">
          <p class="text-3-line">{{ item.product?.name }}</p>
          <p class="cart__item__descr__code">
            {{ $t("product.code") }}: {{ item.product?.artikul }}
          </p>
        </div>
      </NuxtLink>
      <div class="cart__item__price">
        <p v-if="item.product?.price_old" class="old-price">
          {{ item.product?.price_old }} <span>грн.</span>
        </p>
        <p class="price">{{ item.product?.price }} <span>грн.</span></p>
      </div>
      <p class="cart__item__descr__code mobile">
        {{ $t("product.code") }}: {{ item.product?.artikul }}
      </p>
      <div class="cart__item__count">
        <!-- :disabled="item.quantity === 1 || loading" -->
        <button class="btn btn-count" @click="handleCount('-', item.id)">
          -
        </button>
        <span class="count">{{ item.quantity }}</span>
        <button
          :disabled="loading"
          class="btn btn-count"
          @click="handleCount('+', item.product?.id)"
        >
          +
        </button>
      </div>
      <div class="cart__item__total">
        <p>{{ item.total }} <span>грн.</span></p>
        <BaseDropdown class="cart-dropdown">
          <li>
            <button
              class="btn basedropdown__item"
              :disabled="loading"
              @click="removeProduct(item.product?.id, item.quantity)"
            >
              <BaseIconSvg icon-name="delete" width="16" height="16" />
              {{ $t("common.btnDelete") }}
            </button>
          </li>
        </BaseDropdown>
      </div>
    </div>
  </div>
</template>
