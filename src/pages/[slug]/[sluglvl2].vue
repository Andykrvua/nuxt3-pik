<script setup>
const nuxtApp = useNuxtApp();
const route = useRoute();
const url = useRequestURL();
const { locale } = useI18n();
const localePath = useLocalePath();

const isPage = ref(false);
console.log("lvl2");
if (route.params.sluglvl2.includes("page=")) {
  isPage.value = true;
}

// temporarily only post
const { data: respSlug, error } = await useAsyncData(
  `${route.params.sluglvl2}-${route.params.slug}-${locale.value}`,
  () =>
    $api().slug.getSlug(
      isPage.value ? route.params.slug : route.params.sluglvl2
    ),
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

if (!isPage.value && route.params.slug !== respSlug.value?.data?.type?.slug) {
  if (process.client) {
    navigateTo(linksHelper.error);
  } else {
    throw createError({
      statusCode: 404,
      fatal: true,
    });
  }
}

if (isPage.value && route.params.slug !== respSlug.value?.data?.slug) {
  // if 'page=' param exists and current request = posttypeall
  if (process.client) {
    navigateTo(linksHelper.error);
  } else {
    throw createError({
      statusCode: 404,
      fatal: true,
    });
  }
}

const renderView = (entity, template) => {
  if (
    (entity === entityHelper.post && template === templateHelper.promote) ||
    template === templateHelper.blog ||
    template === templateHelper.news
  ) {
    return resolveComponent("PagesPost");
  } else if (
    (isPage.value &&
      entity === entityHelper.post_types &&
      template === templateHelper.allpromote) ||
    template === templateHelper.allnews ||
    template === templateHelper.allblog ||
    template === templateHelper.allvideo ||
    template === templateHelper.allcatalog
  ) {
    return resolveComponent("PagesPosts");
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

console.log("respSluglvl2", respSlug);

if (respSlug?.value) {
  addSeoHead(
    respSlug.value.seo,
    respSlug.value.data.seos || respSlug.value.data.slug,
    route
  );
}
</script>

<template>
  <component
    :is="renderView(respSlug?.data?.entity, respSlug?.data?.template)"
    :data="respSlug"
  />
</template>
