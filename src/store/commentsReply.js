export const useCommentsReply = defineStore("commentsReply", () => {
  const comment = ref({ id: "", name: "" });

  function setComment(val) {
    comment.value = { ...val };
  }

  function clear() {
    comment.value = { id: "", name: "" };
  }

  return {
    comment,
    setComment,
    clear,
  };
});
