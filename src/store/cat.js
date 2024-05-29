export const useCatStore = defineStore("cat", () => {
  const catThree = ref([]);

  function setCatThree(arr) {
    catThree.value = [...arr];
  }

  return {
    catThree,
    setCatThree,
  };
});
