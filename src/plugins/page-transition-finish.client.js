export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("page:transition:finish", () => {
    // console.log("Переход страницы завершен!");
  });
});
