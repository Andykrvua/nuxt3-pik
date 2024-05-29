<script setup>
import { useCatStore } from "~/store/cat";

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const catStore = useCatStore();
const { t } = useI18n();
const br = [{ name: props.data?.data?.name }];

const currentCat = findCatInCatTree(catStore.catThree, props.data.data?.slug);
console.log("currentCat", currentCat);

console.log("propsdata", props.data);
</script>

<template>
  <main class="page cat-page">
    <BaseBreadcrumbs :brList="br" />
    <PagesCatMainBanner
      :title="props.data?.seo?.h1 || props.data?.data?.name"
      :image="props.data?.data?.image"
    />
    <div
      class="cat-page__cat-grid container"
      v-if="currentCat?.category?.children?.length"
    >
      <template v-for="cat in currentCat.category.children" :key="cat.id">
        <div class="cat-page__card">
          <NuxtLink
            no-prefetch
            class="cat-page__card__link"
            :to="localePath(`/${cat.slug}`)"
          >
            <div class="img-wrapper">
              <div class="img-wrapper__hover-anim"></div>
              <NuxtImg
                :src="cat.image?.url || `/images/placeholder-square.svg`"
                :alt="cat.image?.name || cat.name"
                densities="x1 x2"
                width="144"
                height="144"
                loading="lazy"
              />
            </div>
            <div class="cat-name-block">
              <h2 class="cat-name-block__title text-2-line">
                {{ cat.name }}
              </h2>
              <span class="cat-name-block__arrow">
                <BaseIconSvg iconName="arrow-right" width="16" height="16" />
              </span>
            </div>
          </NuxtLink>
          <div
            class="children-cats-wrapper"
            v-if="cat.children && cat.children.length"
          >
            <ul class="cat-page__card__children-cats">
              <li
                v-for="(children, ind) in cat.children"
                :key="children.id"
                :class="{
                  'hidden-desktop': ind > 3,
                }"
              >
                <NuxtLink no-prefetch :to="`/${children.slug}`">
                  <h3 class="children-cat-name">{{ children.name }}</h3>
                </NuxtLink>
              </li>
            </ul>
            <NuxtLink
              no-prefetch
              :to="localePath(`/${cat.slug}`)"
              v-if="cat.children && cat.children.length > 4"
              class="children-cat-name all-cat-link-mobile"
            >
              {{ t("pages.categoryMoreCat") }} {{ cat.children.length - 4 }}
              {{
                declensions(
                  cat.children.length - 4,
                  t("pages.categoryCatOne"),
                  t("pages.categoryCatTwo"),
                  t("pages.categoryCatFive")
                )
              }}
            </NuxtLink>
          </div>
        </div>
      </template>
    </div>
    <SlidersProductsSlider
      v-if="props.data?.products && props.data.products?.length"
      :title="t('pages.categorySliderTitle')"
      :variant="productsSlider.productPage"
      :data="props.data.products"
    />
    <div v-if="props.data.seo?.seo_text" class="container">
      <div class="seo-block" v-html="props.data.seo?.seo_text" />
    </div>
  </main>
</template>
