<script setup>
import { useCatStore } from "~/store/cat";

const catStore = useCatStore();
const nuxtApp = useNuxtApp();
const route = useRoute();
const { locale } = useI18n();
const localePath = useLocalePath();

console.log("sluglvl1");

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
  if (
    entity === entityHelper.product_categories &&
    template === templateHelper.catlvl1
  ) {
    return resolveComponent("PagesCatCatlvl1");
  } else if (
    entity === entityHelper.product_categories &&
    template === templateHelper.catchildrend
  ) {
    return resolveComponent("PagesCatCatchild");
  } else if (
    entity === entityHelper.page &&
    template === templateHelper.allbrands
  ) {
    return resolveComponent("PagesBrands");
  } else if (entity === entityHelper.brands) {
    return resolveComponent("PagesBrandsBrand");
  } else if (
    (entity === entityHelper.post_types &&
      template === templateHelper.allpromote) ||
    template === templateHelper.allnews ||
    template === templateHelper.allblog ||
    template === templateHelper.allvideo ||
    template === templateHelper.allcatalog
  ) {
    return resolveComponent("PagesPosts");
  } else if (entity === entityHelper.page && templateHelper.contacts) {
    return resolveComponent("PagesContacts");
  } else if (entity === entityHelper.product) {
    return resolveComponent("PagesProduct");
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
  addSeoHead(
    respSlug.value.seo,
    respSlug.value.data.seos || respSlug.value.data.slug,
    route
  );
}
console.log("respSlug.value", respSlug.value);
</script>

<template>
  <component
    :is="renderView(respSlug?.data?.entity, respSlug?.data?.template)"
    :data="respSlug"
  />
</template>
