<script setup>
const props = defineProps({
  prodId: {
    type: String,
    default: "",
  },
  comments: {
    type: Object,
    default: {},
  },
});

const { t } = useI18n();

console.log("comments", props.comments);
</script>

<template>
  <div class="product-users-feedback-tabs container">
    <Tabs
      :tabs="[
        {
          id: 'product-users-feedback-reviews',
          name: t('product.reviewTabName'),
          active: true,
        },
        { id: 'product-users-feedback-faq', name: t('product.faqTabName') },
      ]"
    >
      <template #body>
        <div id="product-users-feedback-reviews" class="tab active">
          <PagesProductComments
            :prodId="props.prodId"
            :comments="props.comments[commentsForm.review]"
          />
        </div>
        <div id="product-users-feedback-faq" class="tab">
          <PagesProductComments
            :prodId="props.prodId"
            :comments="props.comments[commentsForm.faq]"
            :variant="commentsForm.faq"
          />
        </div>
      </template>
    </Tabs>
  </div>
</template>
