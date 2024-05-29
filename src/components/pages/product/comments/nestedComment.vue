<script setup>
import { useCommentsReply } from "~/store/commentsReply";

const props = defineProps({
  reviews: {
    type: Object,
    default: {},
  },
  variant: {
    type: String,
    default: commentsForm.review,
  },
});

const commentsReply = useCommentsReply();

const replyHandler = () => {
  commentsReply.setComment({ id: props.reviews.id, name: props.reviews.name });
};
</script>

<template>
  <li>
    <div class="comments__header">
      <div
        class="comments__header__stars"
        v-if="props.variant === commentsForm.review"
      >
        <BaseIconSvg
          v-for="(star, index) in 5"
          :key="index"
          iconName="star"
          width="16"
          height="16"
          :class="{ active: props.reviews.rating > index }"
        />
      </div>

      <p class="comments__header__name">{{ props.reviews.name }}</p>

      <time
        class="comments__header__date"
        :datetime="formattedDate(props.reviews.created_at)?.dateEn"
        >{{ formattedDate(props.reviews.created_at)?.dateUa }}</time
      >
    </div>
    <div class="comments__body">{{ props.reviews.body }}</div>
    <button
      v-if="props.variant === commentsForm.faq"
      class="btn comments__reply"
      @click="replyHandler"
    >
      <BaseIconSvg icon-name="arrow-top-right" width="24" height="24" />
      {{ $t("product.btnReply") }}
    </button>
    <ul
      class="comments__list"
      v-if="props.reviews.children && props.reviews.children?.length"
    >
      <PagesProductCommentsNestedComment
        v-for="item in props.reviews.children"
        :key="item.id"
        :reviews="item"
        :variant="props.variant"
      />
    </ul>
  </li>
</template>
