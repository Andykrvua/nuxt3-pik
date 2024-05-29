<script setup>
import { useModalStore } from "~/store/modal";

const modalStore = useModalStore();
const nuxtApp = useNuxtApp();
const route = useRoute();
const url = useRequestURL();
const { locale } = useI18n();

const openMobileCatalog = () => {
  modalStore.burgerMenu = true;
  modalStore.mobileCatalogMenu = true;
};

const { data: respSlug, error } = await useAsyncData(
  `mainpage-${locale.value}`,
  () => $api().slug.getSlug("holovna"),
  {
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);

if (error.value?.data || !respSlug?.value) {
  console.log("fetchError", error.value.data);
} else {
  const seoHead = {
    ...(respSlug.value.seo.title && {
      title: respSlug.value.seo.title,
    }),
    ...(respSlug.value.seo.description && {
      description: respSlug.value.seo.description,
    }),
    ...(respSlug.value.seo.keywords && {
      keywords: respSlug.value.seo.keywords,
    }),
    ...(url.href && {
      ogUrl: url.href,
    }),
    ...(respSlug.value.seo.og_site_name && {
      ogSiteName: respSlug.value.seo.og_site_name,
    }),
    ...(respSlug.value.seo.og_title && {
      ogTitle: respSlug.value.seo.og_title,
    }),
    ...(respSlug.value.seo.og_description && {
      ogDescription: respSlug.value.seo.og_description,
    }),
    ...(respSlug.value.seo.og_image && {
      ogImage: respSlug.value.seo.og_image,
    }),
    ...(respSlug.value.seo.twitter_title && {
      twitterTitle: respSlug.value.seo.twitter_title,
    }),
    ...(respSlug.value.seo.twitter_description && {
      twitterDescription: respSlug.value.seo.twitter_description,
    }),
    ...(respSlug.value.seo.robots && {
      robots: respSlug.value.seo.robots,
    }),
  };

  useSeoMeta(seoHead);
}

const blockData =
  respSlug.value?.blocks &&
  Array.isArray(respSlug.value.blocks) &&
  respSlug.value.blocks.length
    ? respSlug.value.blocks
    : [];

const blockType = {
  products: "products",
  posts: "posts",
  brands: "brands",
};

const checkBlock = (slug, id, type) => {
  const searchBlock = respSlug.value.blocks.filter(
    (item) => item.slug === slug && item.type === type && item.id === id
  );

  if (
    searchBlock[0].data &&
    Array.isArray(searchBlock[0].data?.[blockType[type]]) &&
    searchBlock[0].data?.[blockType[type]].length
  ) {
    return {
      validType: true,
      data: searchBlock[0].data?.[blockType[type]],
    };
  } else {
    return {
      validType: false,
      data: false,
    };
  }
};

console.log("mainPageProps", respSlug.value);

// need products pages news, actions popular
// :bottomLink="{
//               text: block.data.btn?.title,
//               url: '/',
//             }"
</script>

<template>
  <main class="page home-page">
    <div class="home-grid">
      <div class="category-column">
        <ClientOnly>
          <HeaderCatalogList
            :notDefaultActiveCat="true"
            :isHomePageLayout="true"
          />
        </ClientOnly>
      </div>
      <div class="content-column">
        <SlidersHomeBannersSlider
          v-if="
            respSlug &&
            respSlug.bannergroups &&
            respSlug.bannergroups.length &&
            respSlug.bannergroups[0].banners &&
            respSlug.bannergroups[0].banners.length
          "
          :data="respSlug.bannergroups[0].banners"
        />
        <div class="container">
          <button class="btn btn-grey btn-catalog" @click="openMobileCatalog">
            <BaseIconSvg iconName="catalog" width="22" height="22" />
            {{ $t("common.btnProductsCatalog") }}
          </button>
        </div>
        <template v-for="block in blockData" :key="block.id">
          <SlidersProductsSlider
            v-if="
              block.type === blockType.products &&
              checkBlock(block.slug, block.id, block.type).validType
            "
            :data="checkBlock(block.slug, block.id, block.type).data"
            :title="block.data.title"
            :variant="productsSlider.homePage"
          />
          <SlidersNewsSlider
            v-if="
              block.type === blockType.posts &&
              checkBlock(block.slug, block.id, block.type).validType
            "
            :data="checkBlock(block.slug, block.id, block.type).data"
            :title="block.data.title"
            :variant="newsSliderMainPage[block.slug]"
            :bottomLink="{
              text: block.data.btn?.title,
              url: `/${block.data.btn?.url}`,
            }"
          />
          <SlidersBrandSlider
            v-if="
              block.type === blockType.brands &&
              checkBlock(block.slug, block.id, block.type).validType
            "
            :data="checkBlock(block.slug, block.id, block.type).data"
            :title="block.data.title"
            :bottomLink="{
              text: block.data.btn?.title,
              url: `/${block.data.btn?.url}`,
            }"
          />
        </template>
        <div
          class="about-text container"
          v-if="respSlug && respSlug.seo?.seo_text"
        >
          <ParsedBody
            :body="respSlug.seo.seo_text"
            :contentblocks="respSlug.contentblocks"
          />
        </div>
      </div>
    </div>
  </main>
</template>
