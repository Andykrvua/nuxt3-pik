<script setup>
import { useCartStore } from "~/store/cart";
import { useStaticStore } from "~/store/static";

import apiModules from "~/modules";

const cartStore = useCartStore();
const staticStore = useStaticStore();

// ___________________________________________
const config = useRuntimeConfig();
const token = useCookie("token");
const url = "https://stg-admin.chaspik.ua/api";

const settings = $fetch.create({
  headers: {
    Accept: "application/json",
    "Cache-Control": "no-cache",
  },
  baseURL: config.public.API_BASE_URL,
  // baseURL: url,
  async onRequest({ request, options }) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token.value}`;
    options.headers.xlocale = staticStore.lang;
  },
  async onRequestError({ request, options, error }) {},
  async onResponse({ request, response, options }) {},
  async onResponseError({ request, response, options }) {
    //   if (
    //     response.status == 422 ||
    //     response.status == 403 ||
    //     response.status == 404 ||
    //     response.status == 401
    //   ) {
    //     let obj = {
    //       status: response.status,
    //       message: response._data.message,
    //       errors: {},
    //     };
    //     forEach(response._data.errors, function (value, key) {
    //       obj.errors[key] = value[0];
    //     });
    //     throw createError({
    //       cause: new Error("Custom Error"),
    //       data: obj,
    //     });
    //   }
  },
});

const api = apiModules(settings);
// ___________________________________________

const {
  data: cart,
  error,
  refresh,
} = await useAsyncData(() => $api().cart.getCart());

const update = async () => {
  await refresh();
  cartStore.setCart(cart.value);
  staticStore.setCartData({
    quantity: cart.value?.default?.total?.quantity,
    total: cart.value?.default?.total?.total,
  });
};

if (cart?.value) {
  cartStore.setCart(cart.value);
  staticStore.setCartData({
    quantity: cart.value?.default?.total?.quantity,
    total: cart.value?.default?.total?.total,
  });
  console.log("cart", cart?.value);
} else {
  console.log("cartError", error?.value);
}

console.log("getCart", cart.value);

const {
  data: test,
  errorR,
  refresh: pm,
} = await useAsyncData(() => api.cart.getCart());
// const {
//   data: test,
//   errorR,
//   refresh: pm,
// } = await useAsyncData(() => $api().cart.test());
const {
  data: test2,
  errorR2,
  refresh: pc,
} = await useAsyncData(() =>
  $fetch("https://jsonplaceholder.typicode.com/todos/1")
);
const {
  data: test3,
  errorR4,
  refresh: cm,
} = await useAsyncData(() => $api().categories.getCatThree());
const {
  data: test4,
  errorR5,
  refresh: ct,
} = await useAsyncData(() =>
  $fetch("https://stg-admin.chaspik.ua/api/categories/tree")
);

const r = async () => {
  const data = await $api().cart.test();
};
</script>

<template>
  <main class="page cart">
    <DevOnly>
      <pre>{{ test }}</pre>
      <div>
        <button @click="refresh">getCartInterc</button>
      </div>
      <div>
        <button @click="pm">getPholderInterc</button>
      </div>
      <div>
        <button @click="pc">getPholderClear</button>
      </div>
      <div>
        <button @click="ct">getServerCatClear</button>
      </div>
      <div>
        <button @click="cm">getServerCatInterc</button>
      </div>
    </DevOnly>
    <div class="cart__wrapper">
      <div class="cart__content">
        <h1 class="cart__title">{{ $t("cart.cart") }}</h1>
        <!-- <PagesCartCardGrid :data="cart" @update="update" /> -->
        <PagesCartCardGrid @update="update" />
      </div>
      <div
        v-if="
          cartStore.cart?.default?.purchases &&
          cartStore.cart?.default?.purchases?.length
        "
        class="cart__right-side"
      >
        <p class="cart__right-side__title">{{ $t("cart.total") }}</p>
        <div class="cart__right-side__total">
          <p>
            {{ cartStore.cart.default?.total?.quantity }}
            {{
              declensions(
                cartStore.cart.default?.total?.quantity,
                $t("cart.productItemOne"),
                $t("cart.productItemTwo"),
                $t("cart.productItemFive")
              )
            }}
            {{ $t("cart.sum") }}
          </p>
          <p class="total">
            {{ cartStore.cart.default?.total?.total }} <span>грн.</span>
          </p>
        </div>
        <button class="btn btn-checkout">{{ $t("cart.btnCheckout") }}</button>
      </div>
    </div>
  </main>
</template>
