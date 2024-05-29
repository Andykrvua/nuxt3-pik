<script setup>
const props = defineProps({
  images: {
    type: Array,
    default: [],
  },
  video: {
    type: [Array, Boolean],
    default: false,
  },
  name: {
    type: String,
    default: "",
  },
});

const mainSwiper = ref(null);
const thumbsSwiper = ref(null);
const btnPrev = ref(null);
const btnNext = ref(null);
const btnPrev2 = ref(null);
const btnNext2 = ref(null);
const showVideo = ref(false);

const isModalOpen = ref(false);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const setMainSwiper = (swiper) => {
  mainSwiper.value = swiper;
};

onMounted(() => {
  // fix slider initialization after change route
  if (mainSwiper.value) {
    setTimeout(() => {
      mainSwiper.value.update();
    }, 400);
  }
});

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
  showVideo.value = false;
};
</script>

<template>
  <div>
    <Swiper
      @swiper="setMainSwiper"
      :modules="[
        SwiperEffectCreative,
        SwiperNavigation,
        SwiperThumbs,
        SwiperPagination,
      ]"
      :thumbs="{ swiper: thumbsSwiper }"
      :slides-per-view="1"
      class="product-main-slider"
      :loop="true"
      :navigation="{ nextEl: btnNext, prevEl: btnPrev }"
      :effect="'creative'"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }"
      :pagination="{ clickable: true }"
    >
      <SwiperSlide v-for="(item, ind) in props.images" :key="item.id">
        <button @click="toggleModal">
          <NuxtImg
            :src="
              item?.conversions?.big?.url ||
              item?.url ||
              '/images/placeholder-square.svg'
            "
            :alt="props.name"
            :loading="ind === 0 ? null : 'lazy'"
            :preload="ind === 0 ? true : false"
          />
        </button>
      </SwiperSlide>
      <template v-if="props.video">
        <SwiperSlide v-for="item in props.video" :key="item.url">
          <button @click="toggleModal">
            <div class="video-slide">
              <NuxtImg
                class="video__media"
                alt=""
                :src="`https://i.ytimg.com/vi_webp/${getYouTubeVideoId(
                  item.url
                )}/maxresdefault.webp`"
                densities="x1 x2"
              />
              <svg height="100%" viewBox="0 0 68 48" width="100%">
                <path
                  class="youtube-btn-shape"
                  d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                ></path>
                <path class="youtube-btn-icon" d="M 45,24 27,14 27,34"></path>
              </svg>
            </div>
          </button>
        </SwiperSlide>
      </template>
      <button ref="btnPrev" class="btn main-slider-btn__prev slider-btn__prev">
        <BaseIconSvg iconName="arrow-right" width="28" height="28" />
      </button>
      <button ref="btnNext" class="btn main-slider-btn__next slider-btn__next">
        <BaseIconSvg iconName="arrow-right" width="28" height="28" />
      </button>
    </Swiper>
    <Swiper
      @swiper="setThumbsSwiper"
      :modules="[SwiperThumbs]"
      class="product-thumbs-mainslider"
    >
      <SwiperSlide v-for="item in props.images" :key="item.id">
        <NuxtImg
          :src="
            item?.conversions?.thumb?.url ||
            item?.url ||
            '/images/placeholder-square.svg'
          "
          :placeholder="[100, 100, 75, 5]"
          :alt="item.name || props.name"
          loading="lazy"
          width="108"
          height="108"
        />
      </SwiperSlide>
      <template v-if="props.video">
        <SwiperSlide
          class="video-thumb"
          v-for="item in props.video"
          :key="item.url"
        >
          <img
            :src="`/images/product/video-thumb.webp`"
            alt=""
            width="92"
            height="64"
          />
        </SwiperSlide>
      </template>
    </Swiper>
    <PopupsModal
      v-model="isModalOpen"
      :customClass="'product-main-slider-modal'"
    >
      <Swiper
        @slideChange="showVideo = false"
        :modules="[SwiperEffectCreative, SwiperNavigation]"
        :slides-per-view="1"
        class="product-main-slider product-main-slider-popup"
        :loop="true"
        :navigation="{ nextEl: btnNext2, prevEl: btnPrev2 }"
        :effect="'creative'"
        :creative-effect="{
          prev: {
            shadow: false,
            translate: ['-20%', 0, -1],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }"
      >
        <SwiperSlide v-for="item in props.images" :key="item.id">
          <NuxtImg
            :src="
              item?.url ||
              item?.conversions?.big?.url ||
              '/images/placeholder-square.svg'
            "
            :alt="item.name || props.name"
            loading="lazy"
          />
        </SwiperSlide>
        <template v-if="props.video">
          <SwiperSlide v-for="item in props.video" :key="item.url">
            <button @click="showVideo = true" v-if="!showVideo">
              <div class="video-slide">
                <NuxtImg
                  class="video__media"
                  alt=""
                  :src="`https://i.ytimg.com/vi_webp/${getYouTubeVideoId(
                    item.url
                  )}/maxresdefault.webp`"
                  densities="x1 x2"
                />
                <svg height="100%" viewBox="0 0 68 48" width="100%">
                  <path
                    class="youtube-btn-shape"
                    d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                  ></path>
                  <path class="youtube-btn-icon" d="M 45,24 27,14 27,34"></path>
                </svg>
              </div>
            </button>
            <div class="video-frame" v-else>
              <iframe
                width="100%"
                :src="`https://www.youtube.com/embed/${getYouTubeVideoId(
                  item.url
                )}?rel=0&showinfo=0&autoplay=1`"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                autoplay
              ></iframe>
            </div>
          </SwiperSlide>
        </template>
        <button
          ref="btnPrev2"
          class="btn main-slider-btn__prev slider-btn__prev"
        >
          <BaseIconSvg iconName="arrow-right" width="28" height="28" />
        </button>
        <button
          ref="btnNext2"
          class="btn main-slider-btn__next slider-btn__next"
        >
          <BaseIconSvg iconName="arrow-right" width="28" height="28" />
        </button>
      </Swiper>
    </PopupsModal>
  </div>
</template>
