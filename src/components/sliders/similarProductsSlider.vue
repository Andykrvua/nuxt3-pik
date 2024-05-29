<template>
  <div class="similar-products-slider-wrapper">
    <div class="title container-slider">Схожі товари</div>
    <Swiper
      :modules="[SwiperNavigation, SwiperPagination]"
      class="similar-products-slider"
      :class="{ reachend: reachEnd, reachstart: reachStart }"
      :pagination="{ clickable: true }"
      :navigation="{ nextEl: btnNext, prevEl: btnPrev }"
      @progress="isReach"
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
    >
      <SwiperSlide v-for="slide in props.data" :key="slide.id">
        <SlidersProductCard :data="slide" class="similar-slider" />
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

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
});

const btnPrev = ref(null);
const btnNext = ref(null);
const reachEnd = ref(false);
const reachStart = ref(false);

const isReach = (sw, progress) => {
  progress === 1 ? (reachEnd.value = false) : (reachEnd.value = true);
  progress === 0 ? (reachStart.value = false) : (reachStart.value = true);
};
</script>
