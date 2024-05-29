<script setup>
import { vMaska } from "maska";

const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    default: "",
  },
  className: {
    type: String,
    default: "",
  },
  classInp: {
    type: String,
    default: "",
  },
  mask: {
    type: String,
    default: "",
  },
  iconName: {
    type: String,
    default: "",
  },
  maxLength: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  "input:focus",
  "update:modelValue",
  "input:blur",
  "clickIcon",
]);

let optionsMask = ref({
  mask: props.mask,
  eager: true,
});

function handleFocus(e) {
  props.mask && !props.modelValue
    ? (e.target.value = props.mask.replace(/[^+0-9]/gm, ""))
    : false;
  emit("input:focus");
}

function handleBlur(e) {
  e.target.value = props.modelValue;
  emit("input:blur");
}

function handleInput(e) {
  if (props.type === "number") {
    emit("update:modelValue", Number(e.target.value));
  } else {
    emit("update:modelValue", e.target.value);
  }
}
</script>

<template>
  <div class="input">
    <div class="input__wrapper">
      <label v-if="label" :for="name" class="input__label">{{ label }}</label>
      <input
        :name="name"
        :id="name"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        v-maska:[optionsMask]
        :class="classInp"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        :maxlength="maxLength"
      />
      <div
        @click="emit('clickIcon')"
        class="input__icon"
        v-if="iconName"
        :class="{ withlabel: label }"
      >
        <BaseIconSvg :icon-name="iconName" width="24" height="24" />
      </div>
    </div>
    <p v-if="error" class="error">
      {{ error }}
    </p>
  </div>
</template>
