<script setup>
import { useModalStore } from "~/store/modal";
import { useCatStore } from "~/store/cat";

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const catStore = useCatStore();
const modalStore = useModalStore();

const closeDrawer = () => {
  modalStore.mobileFilters = false;
};

const parentsCategory = findParentsCatInCatThree(
  catStore.catThree,
  props.data.data.slug
);

const br =
  parentsCategory.level === 2
    ? [
        { name: parentsCategory.parentName, url: parentsCategory.parentSlug },
        { name: props.data?.data?.name },
      ]
    : parentsCategory.level === 3
    ? [
        {
          name: parentsCategory.grandParentName,
          url: parentsCategory.grandParentSlug,
        },
        { name: parentsCategory.parentName, url: parentsCategory.parentSlug },
        { name: props.data?.data?.name },
      ]
    : null;

console.log("propsdata", props.data);
</script>

<template>
  <main class="page cat-page cat-page-lvl2">
    <BaseBreadcrumbs v-if="br" :brList="br" />
    <PagesCatMainBanner
      :title="props.data?.data?.name"
      :image="props.data?.data?.image"
    />
    <ul
      class="cat-page__cat-gridlvl2 container"
      v-if="props.data?.data?.children && props.data.data.children?.length"
    >
      <li
        v-for="cat in props.data.data.children"
        :key="cat.id"
        class="cat-page__cardlvl2"
      >
        <NuxtLink
          no-prefetch
          :to="localePath(`/${cat.slug}`)"
          class="cat-page__cardlvl2__link"
        >
          <h2 class="cat-name text-2-line">{{ cat.name }}</h2>
          <span class="cat-name__arrow">
            <BaseIconSvg iconName="arrow-right" width="16" height="16" />
          </span>
        </NuxtLink>
      </li>
    </ul>
    <div class="products-grid-wrapper container">
      <PopupsDrawer
        :is-open="modalStore.mobileFilters"
        :direction="drawerDirection.left"
        :mobileOnly="true"
        @close="closeDrawer"
        class="filter__drawer"
      >
        <PagesCatFilters @close="closeDrawer" />
      </PopupsDrawer>
      <ProductsGridContainer>
        <template v-if="props.data.seo?.seo_text" #seo>
          <div class="seo-block" v-html="props.data.seo?.seo_text" />
        </template>
      </ProductsGridContainer>
    </div>
  </main>
</template>
