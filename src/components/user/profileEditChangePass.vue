<script setup>
import * as yup from "yup";
import { useAuthStore } from "~/store/auth";

const emit = defineEmits(["update:value"]);
const authStore = useAuthStore();
const { t } = useI18n();

const loading = ref(false);
const passwordFieldType = ref("password");
const serverError = ref({
  password: "",
  passwordConfirmation: "",
});

const schema = yup.object({
  password: yup
    .string()
    .min(4, t("validate.authPassw"))
    .required(t("validate.authPasswDefault")),
  passwordConfirmation: yup
    .string()
    .required(t("validate.authPasswRepeat"))
    .oneOf([yup.ref("password")], t("validate.authPasswCompareFalse")),
});

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    password: "",
    passwordConfirmation: "",
  },
});

const { value: password, errorMessage: passwordError } = useField("password");
const { value: passwordConfirmation, errorMessage: passwordConfirmationError } =
  useField("passwordConfirmation");

const isValid = useIsFormValid();

const tryUpdatePassword = async () => {
  let data;
  try {
    data = await $api().profile.setNewPassword({
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    });
  } catch (error) {
    data = error.data;
  }

  if (data.errors) {
    console.log("dataErr", data);

    serverError.value.password = data.errors?.password || "";
    serverError.value.passwordConfirmation =
      data.errors?.passwordConfirmation || "";

    if (data?.message) {
      serverError.value.message = data.message;
    } else {
      serverError.value.message = t("validate.serverUnknownErrorMess");
    }
  } else {
    console.log("dataSuss", data);
    await getProfile();
    editHandler();
  }
};

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  console.log(values);
  await tryUpdatePassword();
  loading.value = false;
});

const clearServerError = () => {
  serverError.value = {
    password: "",
    passwordConfirmation: "",
    message: "",
  };
};

const editHandler = () => {
  emit("update:value", false);
};

const handleClickIcon = () => {
  passwordFieldType.value === "password"
    ? (passwordFieldType.value = "text")
    : (passwordFieldType.value = "password");
};
</script>

<template>
  <div class="change-pass-edit">
    <FieldsInput
      v-model="password"
      name="password"
      :type="passwordFieldType"
      class="base"
      :label="t('auth.inputLabelNewPassw')"
      :error="passwordError || serverError.password"
      @input:focus="clearServerError"
      :iconName="'visibility'"
      @clickIcon="handleClickIcon"
    />
    <FieldsInput
      v-model="passwordConfirmation"
      name="passwordConfirmation"
      :type="passwordFieldType"
      class="base"
      :label="t('auth.inputLabelNewPasswRepeat')"
      :error="passwordConfirmationError || serverError.passwordConfirmation"
      @input:focus="clearServerError"
      :iconName="'visibility'"
      @clickIcon="handleClickIcon"
    />
    <div class="profile-data-edit__btns">
      <p v-if="serverError.message" class="base-error">
        {{ serverError.message }}
      </p>
      <button
        class="btn btn-send"
        :disabled="!isValid || loading"
        @click="onSubmit()"
      >
        {{ t("common.btnSave") }}
      </button>
      <button class="btn btn-cancel" @click="editHandler">
        {{ t("common.btnCancel") }}
      </button>
    </div>
  </div>
</template>
