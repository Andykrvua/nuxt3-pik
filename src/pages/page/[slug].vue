<script setup>
import { useCatStore } from "~/store/cat";

const catStore = useCatStore();
const nuxtApp = useNuxtApp();
const route = useRoute();
const { locale } = useI18n();
const localePath = useLocalePath();

const { data: respSlug, error } = await useAsyncData(
  `${route.params.slug}-${locale.value}`,
  () => $api().slug.getSlug(route.params.slug),
  {
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);

if (error.value?.data || !respSlug?.value || !respSlug?.value?.data?.entity) {
  console.log("fetchError", error.value.data);
  if (process.client) {
    await clearError({ redirect: localePath(linksHelper.error) });
  } else {
    throw createError({
      statusCode: 404,
      fatal: true,
    });
  }
}

console.log("respSlug", respSlug);

const renderView = (entity, template) => {
  if (entity === entityHelper.page && template === templateHelper.delivery) {
    return resolveComponent("PagesSimplePagesInfo");
  } else if (
    entity === entityHelper.page &&
    template === templateHelper.payment
  ) {
    return resolveComponent("PagesSimplePagesInfo");
  } else if (
    entity === entityHelper.page &&
    template === templateHelper.loyaltiprogram
  ) {
    return resolveComponent("PagesSimplePagesInfo");
  } else if (
    entity === entityHelper.page &&
    template === templateHelper.legalpages
  ) {
    return resolveComponent("PagesSimplePagesInfo");
  } else if (
    entity === entityHelper.page &&
    template === templateHelper.warranty
  ) {
    return resolveComponent("PagesSimplePagesInfo");
  } else if (entity === entityHelper.shop) {
    return resolveComponent("PagesSimplePagesShop");
  } else {
    if (process.client) {
      navigateTo(linksHelper.error);
    } else {
      throw createError({
        statusCode: 404,
        fatal: true,
      });
    }
  }
};

if (respSlug?.value) {
  addSeoHead(respSlug.value.seo, respSlug.value.data.seos, route);
}
</script>

<template>
  <component
    :is="renderView(respSlug?.data?.entity, respSlug?.data?.template)"
    :data="respSlug"
  />
</template>
