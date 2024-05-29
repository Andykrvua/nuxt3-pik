import { useCatStore } from "~/store/cat";
import { useStaticStore } from "~/store/static";

export default defineNuxtPlugin((nuxtApp) => {
  const catStore = useCatStore();
  const staticStore = useStaticStore();

  nuxtApp.hook(
    "i18n:beforeLocaleSwitch",
    async ({ oldLocale, newLocale, initialSetup, context }) => {
      let staticData;
      try {
        staticData = await $api().staticdata.get();
      } catch (error) {
        console.log("error static data", error, error?.data);
        staticData = null;
      }

      if (staticData) {
        if (staticData.categories_tree && staticData.categories_tree?.length) {
          catStore.setCatThree(staticData.categories_tree);
        }

        const { categories_tree, ...staticObj } = staticData;
        staticStore.setStaticData(staticObj);

        console.log("staticDataobj", staticObj);
      } else {
        throw createError({
          statusCode: 500,
          fatal: true,
        });
      }
    }
  );
});
