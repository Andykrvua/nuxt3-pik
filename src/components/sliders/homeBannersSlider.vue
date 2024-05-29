<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
});

const btnPrev = ref(null);
const btnNext = ref(null);

console.log("banner", props.data);
</script>

<template>
  <div class="home-banners">
    <Swiper
      :loop="true"
      :modules="[SwiperNavigation, SwiperPagination]"
      class="viewed-products-slider"
      :pagination="{ clickable: true }"
      :navigation="{ nextEl: btnNext, prevEl: btnPrev }"
      :slidesPerView="1"
    >
      <SwiperSlide v-for="slide in props.data" :key="slide.id">
        <NuxtLink
          v-if="
            slide.type === bannerType[100] &&
            slide.images &&
            slide.images.length
          "
          no-prefetch
          :to="localePath(`/${slide.images[0].custom_properties?.url}`)"
          class="home-banners__link"
        >
          <NuxtImg
            v-if="slide.images[0].url"
            :src="slide.images[0].url || `/images/placeholder.svg`"
            :alt="slide.images[0].custom_properties?.alt"
            :title="slide.images[0].custom_properties?.title"
            densities="x1 x2"
            loading="lazy"
          />
        </NuxtLink>
      </SwiperSlide>
      <button ref="btnPrev" class="btn main-slider-btn__prev slider-btn__prev">
        <BaseIconSvg iconName="arrow-right" width="28" height="28" />
      </button>
      <button ref="btnNext" class="btn main-slider-btn__next slider-btn__next">
        <BaseIconSvg iconName="arrow-right" width="28" height="28" />
      </button>
    </Swiper>
  </div>
</template>
