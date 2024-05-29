<script setup>
const props = defineProps({
  img: {
    type: [Object, Boolean],
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: singlePostHelper.news,
  },
  date: {
    type: [String, Object],
    default: "",
  },
});
</script>

<template>
  <div class="single-post__header">
    <NuxtImg
      v-if="props.variant !== singlePostHelper.news"
      preload
      :src="props.img?.url || `/images/placeholder.svg`"
      width="284"
      height="161"
      :alt="props.img?.custom_properties?.alt || props.title"
      :title="props.img?.custom_properties?.title || props.title"
      densities="x1 x2"
    />
    <div>
      <h1 class="single-post__header__title">{{ props.title }}</h1>
      <div
        v-if="props.variant === singlePostHelper.promote"
        class="single-post__header__dates variant-promote"
      >
        <BaseIconSvg iconName="calendar-clock" width="18" height="18" />
        <span
          >{{ reverseDateFormat(props.date?.start_at) }} -
          {{ reverseDateFormat(props.date?.end_at) }}</span
        >
      </div>
      <div v-else class="single-post__header__dates">
        <BaseIconSvg iconName="calendar" width="16" height="16" />
        <time :datetime="formattedDate(props.date)?.dateEn">{{
          formattedDate(props.date)?.dateUa
        }}</time>
      </div>
    </div>
  </div>
</template>
