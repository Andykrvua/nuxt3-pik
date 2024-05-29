<script setup>
const props = defineProps({
  unknown: Boolean,
  default: false,
});

const { locale } = useI18n();
const lang = locale.value === "uk" ? "" : locale.value + "/";
</script>

<template>
  <div class="error-page-404 container">
    <p class="status-code" v-if="!props.unknown">404</p>
    <h2 class="status-text">
      {{ props.unknown ? $t("errors.unknownError") : $t("errors.t404") }}
    </h2>
    <a class="back-link" :href="`/${lang}`">{{ $t("common.goToMainPage") }}</a>
  </div>
</template>
