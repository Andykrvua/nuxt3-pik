<script setup>
import * as yup from "yup";
import { useAuthStore } from "~/store/auth";
import { useModalStore } from "~/store/modal";
import { useCommentsReply } from "~/store/commentsReply";

const props = defineProps({
  prodId: {
    type: String,
    default: "",
  },
  starSelected: {
    type: [Number, Boolean],
    default: false,
  },
  variant: {
    type: String,
    default: commentsForm.review,
  },
});

const authStore = useAuthStore();
const { t } = useI18n();
const commentsReply = useCommentsReply();
const loading = ref(false);
const successMessage = ref(false);
const productId = ref(props.prodId);
const serverError = ref({ name: "", email: "", comment: "", message: "" });
const starSelected = ref(null);
const starSelectedError = ref(false);

const schema = yup.object({
  review_email: yup
    .string()
    .matches(emailReg, t("validate.authEmail"))
    .required(t("validate.authEmailDefault")),
  review_name: yup
    .string()
    .min(2, t("validate.authName"))
    .required(t("validate.authNameDefault")),
  review_message: yup
    .string()
    .min(10, t("validate.commentsText"))
    .required(t("validate.commentsTextDefault")),
});

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    review_name: authStore?.userData?.name || "",
    review_email: authStore?.userData?.email || "",
    review_message: "",
  },
});

const { value: review_name, errorMessage: review_nameError } =
  useField("review_name");
const { value: review_email, errorMessage: review_emailError } =
  useField("review_email");
const { value: review_message, errorMessage: review_messageError } =
  useField("review_message");

const isValid = useIsFormValid();
const resetForm = useResetForm();

const trySendReview = async () => {
  let data;
  try {
    if (props.variant === commentsForm.review) {
      data = await $api().comments.addReview({
        productId: productId.value,
        body: {
          rating: starSelected.value,
          name: review_name.value,
          body: review_message.value,
        },
      });
    } else if (props.variant === commentsForm.faq) {
      data = await $api().comments.addProductQuestion({
        productId: productId.value,
        body: {
          name: review_name.value,
          body: review_message.value,
          parent_id: commentsReply.comment.id,
        },
      });
    }
  } catch (error) {
    data = error.data;
  }

  if (data.errors) {
    console.log("dataErr", data);
    serverError.value.name = data.errors?.name ? data.errors.name : "";
    serverError.value.comment = data.errors?.body ? data.errors.body : "";

    if (data?.message) {
      serverError.value.message = data.message;
    } else {
      serverError.value.message = t("validate.serverUnknownErrorMess");
    }
  } else {
    console.log("dataSuss", data);
    const showMessage = () => {
      successMessage.value = true;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve((successMessage.value = false));
        }, 3000);
      });
    };
    showMessage();
    resetForm();
    commentsReply.clear();
  }
};

const onSubmit = handleSubmit(async (values) => {
  if (props.variant === commentsForm.review && !starSelected.value) {
    starSelectedError.value = true;
    return;
  }

  loading.value = true;
  await trySendReview();
  loading.value = false;
});

const clearServerError = () => {
  serverError.value = { name: "", email: "", comment: "", message: "" };
};

const starSelectedHandler = (val) => {
  starSelected.value = val;
  starSelectedError.value = false;
};

const clearCommetReply = () => {
  commentsReply.clear();
};
</script>

<template>
  <div>
    <p class="title">
      {{
        props.variant === commentsForm.faq
          ? t("product.reviewFormTitle")
          : t("product.faqFormTitle")
      }}
    </p>
    <div
      class="comments-block__controls__header"
      v-if="props.variant === commentsForm.review"
    >
      <PagesProductCommentsStars
        :starSize="'16'"
        @update:star="starSelectedHandler"
      />
      <p class="subtitle" :class="{ error: starSelectedError }">
        {{ t("product.reviewSelectStar") }}
      </p>
    </div>
    <div
      class="comments-block__controls__header"
      v-else-if="props.variant === commentsForm.faq"
    >
      <button
        v-if="commentsReply.comment.id"
        class="btn remove-reply"
        @click="clearCommetReply"
      >
        {{ t("product.faqReplyMessage") }} {{ commentsReply.comment.name }}
      </button>
    </div>
  </div>
  <div class="comments-form">
    <FieldsInput
      v-model="review_name"
      name="review_name"
      class="base base-review"
      :label="t('auth.inputLabelNameV2')"
      :error="review_nameError || serverError.name"
      @input:focus="clearServerError"
    />
    <FieldsInput
      v-model="review_email"
      name="review_email"
      class="base base-review"
      :label="t('auth.inputLabelEmailV2')"
      :error="review_emailError || serverError.email"
      @input:focus="clearServerError"
    />
    <div class="comments-form__helper">
      <FieldsTextarea
        v-model="review_message"
        name="review_message"
        class="base-review"
        :label="
          props.variant === commentsForm.faq
            ? t('auth.inputLabelTextareaFaq')
            : t('auth.inputLabelTextareaReview')
        "
        :error="review_messageError || serverError.comment"
        @input:focus="clearServerError"
      />
      <button class="btn btn-comment" :disabled="loading" @click="onSubmit()">
        {{ t("auth.btnFormSend") }}
      </button>
    </div>
    <p v-if="serverError.message" class="base-error">
      {{ serverError.message }}
    </p>
    <p v-if="successMessage">{{ t("product.commentsSuccessMess") }}</p>
  </div>
</template>
