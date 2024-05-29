<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
let isLocked;

const closeModal = () => {
  emit("update:modelValue", false);
  isLocked.value = false;
};

onMounted(() => {
  isLocked = useScrollLock(document.querySelector("body"));
});

watch(
  () => props.modelValue,
  (val) => {
    val ? (isLocked.value = true) : (isLocked.value = false);
  }
);
</script>

<template>
  <teleport to="body">
    <transition name="modal">
      <div
        class="modal"
        v-if="modelValue"
        @click.self="closeModal"
        :class="props.customClass"
      >
        <div class="modal__dialog">
          <div class="modal__header">
            <button class="btn btn-icon btn-close" @click="closeModal">
              <BaseIconSvg width="24" height="24" icon-name="close" />
            </button>
          </div>
          <div class="modal__content">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss">
.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--base-tr) 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
