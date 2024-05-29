<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: singlePostHelper.news,
  },
  otherPosts: {
    type: Array,
    Boolean,
    default: [],
  },
  template: {
    type: String,
    default: "",
  },
});

const { t } = useI18n();
console.log("variant", props.variant);
console.log("otherPosts", props.otherPosts);

const newVariant = computed(() => {
  if (props.variant === singlePostHelper.promote) {
    return newsSlider.allpromote;
  }
  return newsSlider.allnews;
});

const title = (val) => {
  if (val === singlePostHelper.promote) {
    return t("pages.otherPromotes");
  }

  return t("pages.otherPosts");
};
</script>

<template>
  <div class="single-post__rightcolumn">
    <h4 class="single-post__rightcolumn__title">{{ title(props.template) }}</h4>
    <SlidersNewsCard
      class="single-post__rightcolumn__card"
      :variant="newVariant"
      v-for="item in props.otherPosts"
      :key="item.id"
      :data="item"
    />
  </div>
</template>
