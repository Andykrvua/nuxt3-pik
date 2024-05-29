<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: productsSlider.productPage,
  },
  bottomLink: {
    type: [Object, Boolean],
    default: false,
  },
  data: {
    type: [Array, Boolean],
    default: false,
  },
});

const reachEnd = ref(false);
const reachStart = ref(false);

const isReach = (sw, progress) => {
  progress === 1 ? (reachEnd.value = false) : (reachEnd.value = true);
  progress === 0 ? (reachStart.value = false) : (reachStart.value = true);
};
</script>

<template>
  <div
    class="viewed-products-slider-wrapper"
    :class="props.variant === productsSlider.homePage ? 'homepage-wrapper' : ''"
  >
    <div v-if="props.title" class="title container-slider">
      {{ props.title }}
    </div>
    <Swiper
      :modules="[SwiperNavigation, SwiperPagination]"
      class="viewed-products-slider"
      :class="{
        reachend: reachEnd,
        reachstart: reachStart,
        homepage: props.variant === productsSlider.homePage,
      }"
      :pagination="{ clickable: true }"
      :navigation="{
        nextEl: '.main-slider-btn__next.slider-btn__next',
        prevEl: '.main-slider-btn__prev.slider-btn__prev',
      }"
      @progress="isReach"
      :breakpoints="{
        320: {
          slidesPerView: 2,
          spaceBetween: 24,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
        },
        701: {
          slidesPerView: 'auto',
          spaceBetween: props.variant === productsSlider.homePage ? 32 : 36,
          slidesOffsetBefore: 72,
          slidesOffsetAfter: 72,
        },
      }"
    >
      <SwiperSlide v-for="slide in props.data" :key="slide.id">
        <SlidersProductCard
          :data="slide"
          class="viewed-slider"
          :class="{
            homepage: props.variant === productsSlider.homePage,
          }"
        />
      </SwiperSlide>
      <button class="btn main-slider-btn__prev slider-btn__prev">
        <BaseIconSvg iconName="arrow-right" width="28" height="28" />
      </button>
      <button class="btn main-slider-btn__next slider-btn__next">
        <BaseIconSvg iconName="arrow-right" width="28" height="28" />
      </button>
    </Swiper>
    <div class="bottom-link-wrapper container-slider" v-if="props.bottomLink">
      <NuxtLink
        no-prefetch
        :to="localePath(props.bottomLink.url)"
        class="bottom-link"
        >{{ props.bottomLink.text
        }}<BaseIconSvg iconName="arrow-right-alt" width="24" height="24"
      /></NuxtLink>
    </div>
  </div>
</template>
