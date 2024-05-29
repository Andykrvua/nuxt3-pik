<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const { t } = useI18n();

const br = props.data?.crumbs;
const isBlockFaq = ref({ faq: false, data: [] });

if (props.data?.blocks && props.data.blocks.length) {
  props.data.blocks.filter((item, _) => {
    if (item?.type === "faq") {
      isBlockFaq.value.faq = true;
      isBlockFaq.value.data = item.data.items;
      return;
    }
  });
}

if (props.data?.faq && props.data.faq?.answer && props.data.faq?.question) {
  isBlockFaq.value.faq = true;
}
</script>

<template>
  <main class="page cat-page cat-page-brand">
    <BaseBreadcrumbs
      v-if="props.data?.crumbs && props.data?.crumbs.length"
      :brList="br"
    />
    <div class="cat-page-brand__main-info container">
      <NuxtImg
        :src="props.data?.data?.logo?.url || `/images/placeholder-square.svg`"
        :alt="props.data?.seo?.h1 || props.data.data?.name"
        densities="x1 x2"
        width="60"
        height="60"
        preload
      />
      <h1 class="cat-page-brand__main-info__title">
        {{ props.data?.seo?.h1 || props.data.data?.name }}
      </h1>
      <div class="cat-page-brand__main-info__descr">
        <div v-if="props.data?.data?.body" v-html="props.data?.data?.body" />
        <a v-if="isBlockFaq.faq" href="#brand-faq">{{
          $t("pages.brandFaqTitle")
        }}</a>
      </div>
    </div>
    <div class="products-grid-wrapper container">
      <div>
        <p
          v-if="props.data?.categories && props.data.categories.length"
          class="cat-page-brand__cat-list-title"
        >
          {{ $t("pages.brandCatTitle") }}
        </p>
        <ul
          v-if="props.data?.categories && props.data.categories.length"
          class="cat-page-brand__cat-list"
        >
          <li
            v-for="cat in props.data.categories"
            :key="cat.id"
            class="cat-page-brand__cat-item"
          >
            <NuxtLink
              no-prefetch
              :to="localePath(`/${cat.slug}`)"
              class="cat-page-brand__cat-item__link"
            >
              <h2 class="cat-name text-1-line">{{ cat.name }}</h2>
              <span class="cat-name__arrow">
                <BaseIconSvg iconName="arrow-right" width="16" height="16" />
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <ProductsGridContainer>
        <template v-if="isBlockFaq.faq" #faq>
          <div id="brand-faq" class="brand-faq">
            <p class="brand-faq__title">{{ $t("pages.brandFaqTitle") }}</p>
            <Collaps
              class="faq-collaps"
              v-for="(faq, ind) in isBlockFaq.data"
              :key="ind"
            >
              <template #label>
                <div v-html="faq.question" />
                <BaseIconSvg iconName="arrow-right" width="24" height="24" />
              </template>
              <template #body>
                <div class="collapse-content">
                  <div v-html="faq.answer" />
                </div>
              </template>
            </Collaps>
            <Collaps
              class="faq-collaps"
              v-if="
                props.data?.faq &&
                props.data.faq?.answer &&
                props.data.faq?.question
              "
            >
              <template #label>
                {{ props.data.faq.question }}
                <BaseIconSvg iconName="arrow-right" width="24" height="24" />
              </template>
              <template #body>
                <div class="collapse-content">
                  <p>{{ props.data.faq.answer }}</p>
                </div>
              </template>
            </Collaps>
            <hr v-if="props.data.seo?.seo_text" />
          </div>
        </template>
        <template v-if="props.data.seo?.seo_text" #seo>
          <div class="seo-block" v-html="props.data.seo?.seo_text" />
        </template>
      </ProductsGridContainer>
    </div>
  </main>
</template>
