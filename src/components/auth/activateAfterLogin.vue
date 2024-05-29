<script setup>
import * as yup from "yup";
import { useAuthStore } from "~/store/auth";
import { useModalStore } from "~/store/modal";

const props = defineProps({
  email: {
    type: String,
    defaut: "",
  },
});

const modalStore = useModalStore();
const authStore = useAuthStore();
const { t } = useI18n();
const loading = ref(false);
const serverError = ref({ code: "", message: "" });

const schema = yup.object({
  code3: yup
    .string()
    .matches(/^\d{5}$/, t("validate.authVerCode"))
    .required(t("validate.authVerCodeDefault")),
});

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    code3: "",
  },
});

const { value: code3, errorMessage: codeError } = useField("code3");

const isValid = useIsFormValid();

const tryCodeVerified = async () => {
  let data;
  try {
    data = await $api().auth.codeVerified({
      code: code3.value,
      email: props.email,
    });
  } catch (error) {
    data = error.data;
  }

  if (data.errors) {
    console.log("dataErr", data);
    serverError.value.code = data.errors?.code ? data.errors.code : "";

    if (data?.message) {
      serverError.value.message = data.message;
    } else {
      serverError.value.message = t("validate.serverUnknownErrorMess");
    }
  } else {
    console.log("dataSuss", data);
    authStore.setUserdata({
      ...data.data.user,
    });
    authStore.setToken({
      token: data.data.access_token,
      expires: data.data.expires_seconds,
    });

    modalStore.toggleAuth();
  }
};

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  console.log(values);
  await tryCodeVerified();
  loading.value = false;
});

const clearServerError = () => {
  serverError.value = {
    code: "",
  };
};
</script>

<template>
  <p>
    {{ t("auth.codeSendTitle", { email: props.email }) }}
  </p>
  <FieldsInput
    v-model="code3"
    name="code3"
    :type="'number'"
    class="base"
    :label="t('auth.inputLabelCode')"
    :error="codeError || serverError.code"
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
</template>
