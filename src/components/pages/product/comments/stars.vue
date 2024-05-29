<script setup>
const props = defineProps({
  starSize: {
    type: String,
    default: "32",
  },
});

const emit = defineEmits(["update:star"]);

const hoveredStar = ref(0);
const selectedStar = ref(0);

const changeRatingHover = (ind) => {
  hoveredStar.value = ind + 1;
};

const changeRating = (ind) => {
  selectedStar.value = ind + 1;
  emit("update:star", selectedStar.value);
};
</script>

<template>
  <button
    v-for="(star, ind) in 5"
    :key="ind"
    class="btn btn-icon btn-star"
    :class="{
      hovered: hoveredStar && hoveredStar >= ind + 1,
      active: selectedStar && selectedStar >= ind + 1,
      'btn-star-small': props.starSize !== '32',
    }"
    @mouseover="changeRatingHover(ind)"
    @mouseleave="changeRatingHover(-1)"
    @click="changeRating(ind)"
  >
    <BaseIconSvg
      iconName="star"
      :width="props.starSize"
      :height="props.starSize"
    />
  </button>
</template>
