<script setup>
import { useAuthStore } from "~/store/auth";
import { useModalStore } from "~/store/modal";

const props = defineProps({
  prodId: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: commentsForm.review,
  },
  comments: {
    type: Number,
    default: 0,
  },
});

console.log("commentsinside", props.comments);

const nuxtApp = useNuxtApp();
const modalStore = useModalStore();
const authStore = useAuthStore();

const { data, error } = await useLazyAsyncData(() => {
  if (props.comments) {
    return props.variant === commentsForm.review
      ? $api().comments.getReviews(props.prodId)
      : props.variant === commentsForm.faq
      ? $api().comments.getProductQuestion(props.prodId)
      : null;
  }
});

if (error.value) {
  console.log("fetchError", error.value.data);
} else {
  console.log("fetchReviewsSuccess", data);
}
</script>

<template>
  <div class="comments-block">
    <div
      class="comments-block__items"
      v-if="
        props.variant === commentsForm.review ||
        props.variant === commentsForm.faq
      "
    >
      <div
        v-if="error || !data?.data || !data?.data?.length"
        class="no-comments"
      >
        <p class="title">
          {{
            props.variant === commentsForm.review
              ? $t("product.reviewNoCommentTitle")
              : props.variant === commentsForm.faq
              ? $t("product.faqNoCommentTitle")
              : null
          }}
        </p>

        <p>
          {{
            props.variant === commentsForm.review
              ? $t("product.reviewNoCommentSubTitle")
              : props.variant === commentsForm.faq
              ? $t("product.faqNoCommentSubTitle")
              : null
          }}
        </p>
      </div>
      <div v-else class="comments">
        <ul class="comments__list">
          <PagesProductCommentsNestedComment
            v-for="item in data.data"
            :key="item.id"
            :reviews="item"
            :variant="props.variant"
          />
        </ul>
      </div>
    </div>

    <div class="comments-block__controls">
      <div v-if="!authStore.isUserAuth" class="no-logged">
        <PagesProductCommentsStars
          v-if="props.variant === commentsForm.review"
        />
        <p class="title">
          {{
            props.variant === commentsForm.review
              ? $t("product.reviewControlsTitle")
              : props.variant === commentsForm.faq
              ? $t("product.faqControlsTitle")
              : ""
          }}
        </p>
        <button class="btn btn-accent" @click="modalStore.toggleAuth('l')">
          {{
            props.variant === commentsForm.review
              ? $t("product.btnReviewUnAuth")
              : props.variant === commentsForm.faq
              ? $t("product.btnFaqUnAuth")
              : ""
          }}
        </button>
      </div>
      <LazyPagesProductCommentForm
        v-else
        :prodId="props.prodId"
        :variant="
          props.variant === commentsForm.faq
            ? commentsForm.faq
            : commentsForm.review
        "
      />
    </div>
  </div>
</template>
