<script setup>
const props = defineProps({
  slug: {
    type: String,
    default: "",
  },
  template: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: newsSlider.allnews,
  },
  otherPosts: {
    type: [Array, Boolean],
    default: false,
  },
});

let modifiedOtherPosts;
if (props.otherPosts) {
  modifiedOtherPosts = props.otherPosts.map((item) => {
    return { ...item, type: { slug: props.slug } };
  });
}
</script>

<template>
  <div class="single-post__grid container">
    <article class="single-post__content">
      <slot name="header" />
      <slot />
    </article>
    <PagesPostRightColumn
      :variant="props.variant"
      v-if="props.otherPosts"
      :otherPosts="modifiedOtherPosts"
      :template="props.template"
    />
  </div>
</template>
