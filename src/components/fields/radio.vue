<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  iconWidth: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "id",
  },
  colorLight: {
    type: Boolean,
    default: false,
  },

  value: {
    type: [String, Boolean, Number],
    default: null,
  },
  modelValue: {
    type: [String, Boolean, Number],
    default: null,
  },
});
function changeValue(e) {
  emit("update:modelValue", e.target.value);
}
</script>

<template>
  <label class="radio" :class="{ light: colorLight }">
    <input
      type="radio"
      @change="changeValue"
      :name="name"
      :value="value"
      :checked="value == modelValue"
    />
    <div class="radio__check">
      <!-- <BaseIconSvg
          v-if="icon"
          :icon-name="icon"
          :width="iconWidth"
          :height="iconHeight"
          customClass="icon-primary"
        /> -->
    </div>
    {{ label }}
  </label>
</template>