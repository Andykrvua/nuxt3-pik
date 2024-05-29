<script setup>
const props = defineProps({
  error: Object,
});

// TODOS: check hook if code 500
const { locale } = useI18n();
const lang = locale.value === "uk" ? "" : locale.value + "/";
</script>

<template>
  <div class="error-page-404 container">
    <p class="status-code">{{ error.statusCode }}</p>
    <h2 class="status-text">
      {{
        error.statusCode === 404 ? $t("errors.t404") : $t("errors.unknownError")
      }}
    </h2>
    <DevOnly>
      <pre>{{ error }}</pre>
    </DevOnly>
    <a class="back-link" :href="`/${lang}`">{{ $t("common.goToMainPage") }}</a>
  </div>
</template>
