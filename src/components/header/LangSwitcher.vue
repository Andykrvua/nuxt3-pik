<script setup>
import { useStaticStore } from "~/store/static";

// const route = useRoute();
// const router = useRouter();
const staticStore = useStaticStore();
const { locale, locales, setLocale } = useI18n();

const switchLocale = (newLocale) => {
  staticStore.setLang(newLocale);
  setLocale(newLocale);

  // const currentLocale = locale.value;
  // if (newLocale === currentLocale) return;

  // const path = route.fullPath.replace(`/${currentLocale}/`, "/");
  // const newPath = newLocale === "uk" ? path : `/${newLocale}${path}`;

  // locale.value = newLocale;
  // router.push(newPath);
};
</script>

<template>
  <div class="lang-switcher">
    <BaseDropdown :triangle="true" :position="{ left: 0, bottom: 0 }">
      <template #btn-title>
        <BaseIconSvg :icon-name="`lang-${locale}`" width="24" height="24" />
        {{ locale === "uk" ? "UA" : locale }}</template
      >
      <li v-for="lang in locales" :key="lang.code">
        <button
          class="btn basedropdown__item"
          :disabled="locale === lang.code"
          @click="switchLocale(lang.code)"
        >
          <BaseIconSvg
            :icon-name="`lang-${lang.code}`"
            width="24"
            height="24"
          />
          {{ lang.code === "uk" ? "UA" : lang.code }}
        </button>
      </li>
    </BaseDropdown>
  </div>
</template>
