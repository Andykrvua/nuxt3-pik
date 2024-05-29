<script setup>
import * as yup from "yup";
import { useAuthStore } from "~/store/auth";

const props = defineProps({
  email: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["back"]);

const authStore = useAuthStore();
const { t } = useI18n();
const loading = ref(false);
const serverError = ref({ code: "", password: "", message: "" });
const serverSuccess = ref("");
const serverSuccessMessage = ref("");
const passwordFieldType = ref("password");

const schema = yup.object({
  password3: yup
    .string()
    .min(8, t("validate.authPassw"))
    .required(t("validate.authPasswDefault")),
  code2: yup
    .string()
    .matches(/^\d{5}$/, t("validate.authVerCode"))
    .required(t("validate.authVerCodeDefault")),
});

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    code2: "",
    password3: "",
  },
});

const { value: code2, errorMessage: codeError } = useField("code2");
const { value: password3, errorMessage: passwordError } = useField("password3");

const isValid = useIsFormValid();

const tryChangePassw = async () => {
  let data;
  try {
    data = await $api().auth.resetPassw({
      email: props.email,
      code: code2.value.toString(),
      password: password3.value,
    });
  } catch (error) {
    data = error.data;
  }

  if (data.errors) {
    console.log("dataErr", data);
    serverError.value.code = data.errors?.code ? data.errors.code : "";
    serverError.value.password = data.errors?.password
      ? data.errors.password
      : "";

    if (data?.message) {
      serverError.value.message = data.message;
    } else {
      serverError.value.message = t("validate.serverUnknownErrorMess");
    }
  } else {
    console.log("dataSucc", data);
    emit("back");
  }
};

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  await tryChangePassw();
  loading.value = false;
});

const clearServerError = () => {
  serverError.value = { code: "", password: "", message: "" };
};

const handleClickIcon = () => {
  passwordFieldType.value === "password"
    ? (passwordFieldType.value = "text")
    : (passwordFieldType.value = "password");
};
</script>

<template>
  <div class="change-passw">
    <p>
      {{ t("auth.cahngePasswCodeSendTitle") }}
    </p>
    <FieldsInput
      v-model="code2"
      name="code2"
      :type="'number'"
      class="base"
      :label="t('auth.inputLabelCode')"
      :error="codeError || serverError.code"
      @input:focus="clearServerError"
    />
    <FieldsInput
      v-model="password3"
      name="password3"
      :type="passwordFieldType"
      class="base"
      :label="t('auth.inputLabelNewPassw')"
      :error="passwordError || serverError.password"
      :iconName="'visibility'"
      @clickIcon="handleClickIcon"
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
      {{ t("auth.btnPasswChange") }}
    </button>
  </div>
</template>
