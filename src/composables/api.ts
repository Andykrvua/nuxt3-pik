import apiRepositories from "~/modules";

export const $api = () => {
  const { $apiSettings } = useNuxtApp();
  return apiRepositories($apiSettings);
};
