<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <div class="single-post__pagination">
    <NuxtLink
      v-if="props.data?.prev?.slug"
      class="single-post__pagination__item"
      :to="
        localePath(`/${props.data.data.type.slug}/${props?.data?.prev?.slug}`)
      "
    >
      <BaseIconSvg iconName="arrow-right-alt" width="20" height="20" />
      {{ $t("pages.postNext") }}<br />
      {{ $t("pages.postItem") }}</NuxtLink
    >
    <NuxtLink
      v-if="props.data?.next?.slug"
      class="single-post__pagination__item"
      :to="
        localePath(`/${props.data.data.type.slug}/${props?.data?.next?.slug}`)
      "
    >
      {{ $t("pages.postPrev") }}<br />
      {{ $t("pages.postItem") }}
      <BaseIconSvg iconName="arrow-right-alt" width="20" height="20" />
    </NuxtLink>
  </div>
</template>
