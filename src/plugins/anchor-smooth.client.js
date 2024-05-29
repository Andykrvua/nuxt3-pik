export default defineNuxtPlugin((nuxtApp) => {
  onNuxtReady(async () => {
    nuxtApp.hook("page:transition:finish", async () => {
      if (nuxtApp.$router.currentRoute.value.hash) {
        const headerHeight = 180;
        const el = document.querySelector(
          nuxtApp.$router.currentRoute.value.hash
        );
        return window.scrollTo({
          top: el.offsetTop - headerHeight,
          behavior: "smooth",
        });
      }
    });
  });
});
