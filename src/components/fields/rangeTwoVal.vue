<template>
  <div class="range-slider-container">
    <div class="range-slider-base-inputs">
      <slot name="inputs" />
    </div>
    <div class="range-slider">
      <div class="range-slider__control">
        <input
          id="fromSlider"
          v-model="fromVal"
          type="range"
          :min="min"
          :max="max"
          :aria-label="$t('filter.rangeMin')"
        />
        <input
          id="toSlider"
          v-model="toVal"
          type="range"
          :style="{
            background: sliderBackgroundGradient,
            zIndex: to <= 0 ? 2 : 0,
          }"
          :min="min"
          :max="max"
          :aria-label="$t('filter.rangeMax')"
        />
      </div>
    </div>
    <div class="range-slider__values">
      <span class="range-slider__values__from">{{ from }}</span>
      <span class="range-slider__values__to">{{ to }}</span>
    </div>
  </div>
</template>

<script>
// https://medium.com/@predragdavidovic10/native-dual-range-slider-html-css-javascript-91e778134816
// https://codepen.io/predragdavidovic/pen/mdpMoWo
// TODO: in vue3, we can have a simpler multiple v-model setup instead of emitting events
export default {
  props: {
    from: { type: Number, default: 0 },
    to: { type: Number, default: 100 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 5000 },
    sliderColor: { type: String, default: "var(--lightgrey-bg)" },
    rangeColor: { type: String, default: "var(--color-accent)" },
  },
  data() {
    return {
      fromVal: null,
      toVal: null,
    };
  },
  computed: {
    sliderBackgroundGradient() {
      const rangeDistance = this.max - this.min;
      const fromPosition = this.fromVal - this.min;
      const toPosition = this.toVal - this.min;
      return `linear-gradient(
      to right,
      ${this.sliderColor} 0%,
      ${this.sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${this.rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${this.rangeColor} ${(toPosition / rangeDistance) * 100}%,
      ${this.sliderColor} ${(toPosition / rangeDistance) * 100}%,
      ${this.sliderColor} 100%)`;
    },
  },
  watch: {
    to(t) {
      this.toVal = t;
    },
    from(f) {
      this.fromVal = f;
    },
    fromVal(newFrom) {
      if (Number(newFrom) > Number(this.toVal)) {
        this.fromVal = Number(this.toVal);
      }
      this.fromVal = Number(this.fromVal);
      this.$emit("fromChange", this.fromVal);
    },
    toVal(newTo) {
      if (Number(newTo) < Number(this.fromVal)) {
        this.toVal = Number(this.fromVal);
      }
      this.toVal = Number(this.toVal);
      this.$emit("toChange", this.toVal);
    },
  },
  created() {
    // this.fromVal = Math.max(this.from, this.min);
    // this.toVal = Math.min(this.to, this.max);
    this.fromVal = this.from;
    this.toVal = this.to;
  },
};
</script>
