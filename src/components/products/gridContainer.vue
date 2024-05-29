<script setup>
const nuxtApp = useNuxtApp();
const route = useRoute();

const perPage = ref(10);
const page = ref(1);
const view = ref(0);
const loadMoreCount = ref(40);

const onClickHandler = async (page) => {
  // if (page === 1) {
  //   await navigateTo(`/${route.params.slug}/`);
  // } else {
  //   await navigateTo(`/${route.params.slug}/page=${page}/`);
  // }
};

const onClickHandler2 = (page) => {
  const currentPage = window.location.pathname;
  const pageParam = "/page=" + page;

  if (currentPage.includes("/page")) {
    const newUrl = currentPage.replace(/\/page=\d+/, pageParam);
    window.history.pushState({ path: newUrl }, "", newUrl);
  } else {
    const newUrl = currentPage + pageParam;
    window.history.pushState({ path: newUrl }, "", newUrl);
  }

  // function parseURLParams(url) {
  //   const paramsString = url.substring(url.lastIndexOf("/") + 1);
  //   const params = new URLSearchParams(paramsString);
  //   const result = {};

  //   for (const [name, value] of params) {
  //     result[name] = value;
  //   }

  //   return result;
  // }

  // const url = window.location.pathname;
  // const params = parseURLParams(url);

  // console.log("params", params);
};

const blog = ref("ddd");

const { data: products, error } = await useAsyncData(
  `${route.params.slug}-products-${page.value}`,
  () =>
    $api().products.getProducts({ per_page: perPage.value, page: page.value }),
  {
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
    // watch: [perPage, page],
  }
);

if (error.value?.data) {
  console.log("fetchError", error.value.data);
}

console.log("productsResp", products.value);
</script>

<template>
  <div>
    <!-- <button @click="perPage++">++++</button>
    <button @click="perPage--">-----</button> -->
    <ProductsGridHeader
      v-if="!error"
      :meta="products?.meta"
      :length="products?.data?.length"
    />
    <ProductsGrid
      v-if="!error && products?.data && products.data.length"
      :data="products.data"
    />
    <div v-if="!error" class="pagination-wrapper">
      <button class="btn btn-loadmore">
        <BaseIconSvg iconName="rotate-right" width="24" height="24" />
        {{ $t("common.loadMore", { loadMoreCount: loadMoreCount }) }}
      </button>
      <VueAwesomePaginate
        v-if="perPage < Number(products.meta.total)"
        :total-items="products.meta.total"
        :items-per-page="perPage"
        :max-pages-shown="5"
        v-model="page"
        :on-click="onClickHandler"
        type="link"
        :hide-prev-next-when-ends="true"
        :link-url="`/${route.params.slug}/page=[page]/`"
      >
        <template #prev-button>
          <BaseIconSvg iconName="arrow-right" width="24" height="24" />
        </template>
        <template #next-button>
          <BaseIconSvg iconName="arrow-right" width="24" height="24" />
        </template>
      </VueAwesomePaginate>
    </div>
    <slot name="faq" />
    <slot name="seo" />
  </div>
</template>
