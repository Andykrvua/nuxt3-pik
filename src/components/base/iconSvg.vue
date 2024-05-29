<script setup>
const props = defineProps({
  iconName: {
    type: String,
    default: "main-menu",
  },
  customClass: {
    type: String,
    default: "",
  },
  width: {
    type: [Number, String],
    default: "22",
  },
  height: {
    type: [Number, String],
    default: "22",
  },
});
</script>

<template>
  <svg
    class="icon-svg"
    :class="[`icon-svg-${iconName}`, customClass]"
    :width="width"
    :height="height"
  >
    <use :xlink:href="`/images/sprite.svg#${iconName}`"></use>
  </svg>
</template>
