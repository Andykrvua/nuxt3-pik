<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
});

const btnPrev = ref(null);
const btnNext = ref(null);
</script>

<template>
  <div>
    <Swiper
      :modules="[SwiperNavigation]"
      :slides-per-view="'auto'"
      class="product-variation-slider"
      :navigation="{ nextEl: btnNext, prevEl: btnPrev }"
      :breakpoints="{
        320: {},
        1099: {},
      }"
    >
      <SwiperSlide v-for="item in props.data" :key="item.id">
        <NuxtLink
          no-prefetch
          :to="localePath(`/${item.slug}`)"
          :class="{ 'out-of-stock': !item.availability }"
        >
          <NuxtImg
            :src="item?.images[0]?.url || '/images/placeholder-square.svg'"
            :alt="item.name"
            width="80"
            height="80"
            loading="lazy"
          />
          <p class="current">{{ item.similar_name }}</p>
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
