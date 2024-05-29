<script setup>
import { useAuthStore } from "~/store/auth";
import { useCatStore } from "~/store/cat";
import { useStaticStore } from "~/store/static";

const authStore = useAuthStore();
const catStore = useCatStore();
const staticStore = useStaticStore();
const { locale } = useI18n();
const cookieToken = useCookie("token");
staticStore.setLang(locale.value);

const { data: staticData, error } = await useAsyncData(`staticData`, () =>
  $api().staticdata.get()
);

if (staticData.value) {
  if (
    staticData.value.categories_tree &&
    staticData.value.categories_tree?.length
  ) {
    catStore.setCatThree(staticData.value.categories_tree);
  }

  const { categories_tree, ...staticObj } = staticData.value;
  staticStore.setStaticData(staticObj);
  console.log("categories_tree", categories_tree);
  console.log("staticDataobj", staticObj);
} else {
  throw createError({
    statusCode: 500,
    fatal: true,
  });
}

onMounted(async () => {
  if (cookieToken.value && !authStore.isUserAuth) {
    await getProfile();
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage
      :transition="{
        name: 'my',
        mode: 'out-in',
      }"
    />
  </NuxtLayout>
</template>
