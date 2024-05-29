import forEach from "lodash/forEach";
import { useStaticStore } from "~/store/static";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const token = useCookie("token");
  const staticStore = useStaticStore();

  const settings = $fetch.create({
    // ignoreResponseError: true,
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache",
    },
    baseURL: config.public.API_BASE_URL,
    async onRequest({ request, options }) {
      options.headers = options.headers || {};
      options.headers.Authorization = `Bearer ${token.value}`;
      options.headers.xlocale = staticStore.lang;
    },
    async onRequestError({ request, options, error }) {},
    async onResponse({ request, response, options }) {},
    async onResponseError({ request, response, options }) {
      console.log("res ERROR", response);
      if (
        response.status == 422 ||
        response.status == 403 ||
        response.status == 404 ||
        response.status == 401
      ) {
        let obj = {
          status: response.status,
          message: response._data.message,
          errors: {},
        };
        forEach(response._data.errors, function (value, key) {
          obj.errors[key] = value[0];
        });
        throw createError({
          cause: new Error("Custom Error"),
          data: obj,
        });
      }
    },
  });

  return {
    provide: {
      apiSettings: settings,
    },
  };
});
