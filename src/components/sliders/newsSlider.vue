<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: newsSlider.allnews,
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
  <div class="viewed-products-slider-wrapper">
    <div class="title container-slider">{{ props.title }}</div>
    <Swiper
      :modules="[SwiperNavigation, SwiperPagination]"
      :class="{
        reachend: reachEnd,
        reachstart: reachStart,
      }"
      :pagination="{ clickable: true }"
      @progress="isReach"
      class="viewed-products-slider news-products-slider"
      :breakpoints="{
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
        },
        701: {
          slidesPerView: 'auto',
          spaceBetween: 32,
          slidesOffsetBefore: 72,
          slidesOffsetAfter: 72,
        },
      }"
      :navigation="{
        nextEl: '.slider-btn__next__news',
        prevEl: '.slider-btn__prev__news',
      }"
    >
      <SwiperSlide v-for="slide in props.data" :key="slide.id">
        <SlidersNewsCard :variant="props.variant" :data="slide" />
      </SwiperSlide>
      <button
        class="btn main-slider-btn__prev slider-btn__prev slider-btn__prev__news"
      >
        <BaseIconSvg iconName="arrow-right" width="28" height="28" />
      </button>
      <button
        class="btn main-slider-btn__next slider-btn__next slider-btn__next__news"
      >
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
