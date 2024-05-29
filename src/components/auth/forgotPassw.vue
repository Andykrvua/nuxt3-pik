<script setup>
import * as yup from "yup";
import { useAuthStore } from "~/store/auth";

const emit = defineEmits(["back"]);

const authStore = useAuthStore();
const { t } = useI18n();
const loading = ref(false);
const serverError = ref({ email: "", message: "" });
const serverSuccess = ref(false);

const schema = yup.object({
  email3: yup
    .string()
    .matches(emailReg, t("validate.authEmail"))
    .required(t("validate.authEmailDefault")),
});

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    email3: "",
  },
});

const { value: email3, errorMessage: emailError } = useField("email3");

const isValid = useIsFormValid();

const tryForgoutPassw = async () => {
  let data;
  try {
    data = await $api().auth.forgotPassw({
      email: email3.value,
    });
  } catch (error) {
    data = error.data;
  }

  if (data.errors) {
    console.log("dataErr", data);
    serverError.value.email = data.errors?.email ? data.errors.email : "";

    if (data?.message) {
      serverError.value.message = data.message;
    } else {
      serverError.value.message = t("validate.serverUnknownErrorMess");
    }
  } else {
    serverSuccess.value = true;
    console.log("dataSuss", data);
  }
};

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  await tryForgoutPassw();
  loading.value = false;
});

const clearServerError = () => {
  serverError.value = { email: "", message: "" };
};
</script>

<template>
  <div>
    <transition name="my" mode="out-in">
      <LazyAuthChangePassw
        v-if="serverSuccess"
        :email="email3"
        @back="emit('back')"
      />
      <div v-else>
        <FieldsInput
          class="base"
          v-model="email3"
          name="email3"
          :label="t('auth.inputLabelEmail')"
          :error="emailError || serverError.email"
          @input:focus="clearServerError"
        />
        <p v-if="serverError.message" class="base-error">
          {{ serverError.message }}
        </p>
        <button
          class="btn btn-buy"
          :disabled="!isValid || loading"
          @click="onSubmit()"
        >
          {{ t("auth.btnFormSend") }}
        </button>
      </div>
    </transition>
    <button class="btn forgot-pass" @click="emit('back')">
      {{ t("auth.btnBack") }}
    </button>
  </div>
</template>
