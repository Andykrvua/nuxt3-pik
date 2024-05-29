<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: newsSlider.allnews,
  },
  data: {
    type: Object,
    default: {},
  },
});

const isModalOpen = ref(false);
const toggleModal = () => (isModalOpen.value = !isModalOpen.value);
</script>

<template>
  <NuxtLink
    no-prefetch
    :to="
      localePath(
        props.variant === newsSlider.allvideo
          ? ''
          : props.variant === newsSlider.allcatalog
          ? props.data?.url_file
          : `/${props.data?.type?.slug}/${props.data?.slug}`
      )
    "
    :target="props.variant === newsSlider.allcatalog ? '_blank' : '_self'"
    class="slider-news-card"
    :class="{ 'video-card': props.variant === newsSlider.allvideo }"
    @click="props.variant === newsSlider.allvideo ? toggleModal() : null"
  >
    <div
      v-if="props.variant === newsSlider.allvideo"
      class="slider-news-card__img-wrapper"
    >
      <NuxtImg
        class="video__media"
        alt=""
        :src="`https://i.ytimg.com/vi_webp/${getYouTubeVideoId(
          props.data?.url_video
        )}/maxresdefault.webp`"
        densities="x1 x2"
      />
      <button class="btn youtube-btn" aria-label="Запустити відео">
        <svg height="100%" viewBox="0 0 68 48" width="100%">
          <path
            class="youtube-btn-shape"
            d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
          ></path>
          <path class="youtube-btn-icon" d="M 45,24 27,14 27,34"></path>
        </svg>
      </button>
    </div>
    <div v-else class="slider-news-card__img-wrapper">
      <NuxtImg
        :src="props.data?.image?.url || `/images/placeholder.svg`"
        :alt="props.data?.image?.custom_properties?.alt || props.data?.name"
        :title="props.data?.image?.custom_properties?.title || props.data?.name"
        densities="x1 x2"
        :placeholder="[160, 90, 75, 5]"
      />
    </div>
    <div
      v-if="props.variant === newsSlider.allnews"
      class="slider-news-card__content slider-news-card__content__news"
    >
      <h5 class="news-card-name">
        {{ props.data?.name }}
      </h5>
      <div class="slider-news-card__content__news__date">
        <BaseIconSvg iconName="calendar" width="16" height="16" />
        <time :datetime="formattedDate(props.data?.published_at)?.dateEn">{{
          formattedDate(props.data?.published_at)?.dateUa
        }}</time>
      </div>
    </div>
    <div
      v-else-if="props.variant === newsSlider.allpromote"
      class="slider-news-card__content slider-news-card__content__promote"
    >
      <div class="slider-news-card__content__promote__date">
        <BaseIconSvg iconName="calendar-clock" width="18" height="18" />
        <span
          >{{ reverseDateFormat(props.data?.start_at) }} -
          {{ reverseDateFormat(props.data?.end_at) }}</span
        >
      </div>
      <h5 class="news-card-name">
        {{ props.data?.name }}
      </h5>
    </div>
    <div
      v-else-if="props.variant === newsSlider.allvideo"
      class="slider-news-card__content slider-news-card__content__video"
    >
      <h5 class="news-card-name">
        {{ props.data.name }}
      </h5>
      <PopupsModal v-model="isModalOpen" :customClass="'youtube-modal'">
        <iframe
          width="560"
          height="315"
          :src="`https://www.youtube.com/embed/${getYouTubeVideoId(
            props.data?.url_video
          )}?rel=0&showinfo=0&autoplay=1`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          autoplay
        ></iframe>
      </PopupsModal>
    </div>
    <div
      v-else-if="props.variant === newsSlider.allcatalog"
      class="slider-news-card__content slider-news-card__content__catalogs"
    >
      <h5 class="news-card-name">{{ props.data.name }}</h5>
      <BaseIconSvg iconName="download" width="24" height="24" />
    </div>
  </NuxtLink>
</template>
