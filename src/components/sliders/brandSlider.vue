<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  data: {
    type: [Array, Boolean],
    default: false,
  },
  bottomLink: {
    type: Object,
    default: {},
  },
});

console.log("brand", props.data);

const swiperRef = ref(null);
const isSwiperRunning = ref(null);

const setSwiper = (swiper) => {
  swiperRef.value = swiper;
};

onMounted(() => {
  checkScreenWidth();
  window.addEventListener("resize", checkScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenWidth);
});

const checkScreenWidth = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 700) {
    if (swiperRef.value) {
      swiperRef.value.disable();
      isSwiperRunning.value = false;
    }
  } else {
    if (swiperRef.value) {
      swiperRef.value.enable();
      isSwiperRunning.value = true;
    }
  }
};
</script>

<template>
  <div class="viewed-products-slider-wrapper">
    <div class="title container-slider">{{ props.title }}</div>
    <Swiper
      class="brand-slider"
      :class="{ off: !isSwiperRunning }"
      @swiper="setSwiper"
      :breakpoints="{
        320: {
          slidesPerView: 'auto',
          spaceBetween: 0,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
        },
        701: {
          slidesPerView: 'auto',
          spaceBetween: 48,
          slidesOffsetBefore: 72,
          slidesOffsetAfter: 72,
        },
      }"
    >
      <SwiperSlide v-for="slide in props.data" :key="slide.id">
        <NuxtLink no-prefetch :to="localePath(`/${slide.slug}`)">
          <NuxtImg
            :src="slide?.logo?.url || `/images/placeholder-square.svg`"
            :placeholder="[100, 100, 75, 5]"
            :alt="props.data?.name"
            densities="x1 x2"
            loading="lazy"
          />
        </NuxtLink>
      </SwiperSlide>
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
