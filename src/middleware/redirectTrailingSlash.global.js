export default defineNuxtRouteMiddleware((to, from) => {
  const hasTrailingSlash = to.fullPath.endsWith("/");
  const hasHash = to.fullPath.includes("#");

  if (!hasTrailingSlash && !hasHash) {
    return navigateTo(to.fullPath + "/", { redirectCode: 301 });
  }
});
