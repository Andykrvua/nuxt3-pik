<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const nuxtApp = useNuxtApp();
const br = [{ name: props.data.data?.name }];

const popularBrands = findBlockInPageData(
  props.data.blocks,
  blockTypes.brands,
  "allbrands"
);

const { data: brandsList, error } = await useAsyncData(
  "allbrands",
  () => $api().brands.getBrandsList(),
  {
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);

let sortedGroupedBarnds;

if (error.value) {
  console.log("er", error.value);
} else {
  const groupedBarnds = brandsList.value.data.reduce((acc, item) => {
    const firstLetter = item.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {});

  sortedGroupedBarnds = Object.keys(groupedBarnds)
    .sort()
    .map((letter) => ({
      letter,
      items: groupedBarnds[letter],
    }));
}
</script>

<template>
  <main class="page cat-page cat-page-brand cat-page-brands">
    <BaseBreadcrumbs :brList="br" v-if="!error" />
    <div class="container" v-if="!error">
      <h1 class="cat-page-brands__title">
        {{ props.data?.seo?.h1 || props.data.data?.name }}
      </h1>
      <PagesBrandsPopularBrands
        v-if="popularBrands?.brands && popularBrands.brands.length"
        :data="popularBrands"
      />
      <div class="cat-page-brands__all-links">
        <div
          class="all-links-block"
          v-for="block in sortedGroupedBarnds"
          :key="block.letter"
        >
          <div class="all-links-block__first-letter">{{ block.letter }}</div>
          <ul class="all-links-block__list">
            <li v-for="item in block.items" :key="item.id">
              <NuxtLink no-prefetch :to="localePath(`/${item.slug}`)">{{
                item.name
              }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="seo-block"
        v-if="props.data.seo?.seo_text"
        v-html="props.data.seo?.seo_text"
      />
    </div>
    <BaseError unknown v-else />
  </main>
</template>
