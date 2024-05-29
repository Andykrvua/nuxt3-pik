<script setup>
import * as yup from "yup";
import { useAuthStore } from "~/store/auth";
import { useModalStore } from "~/store/modal";

const emit = defineEmits(["cancelCode"]);

const modalStore = useModalStore();
const authStore = useAuthStore();
const { t } = useI18n();
const loading = ref(false);
const restartTimer = ref(false);
const serverError = ref({ code: "", message: "" });
const serverSuccessMessage = ref("");

const schema = yup.object({
  code: yup
    .string()
    .matches(/^\d{5}$/, t("validate.authVerCode"))
    .required(t("validate.authVerCodeDefault")),
});

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    code: "",
  },
});

const { value: code, errorMessage: codeError } = useField("code");

const isValid = useIsFormValid();

const tryCodeVerified = async () => {
  const cookieEmail = useCookie("userEmail");
  if (!cookieEmail.value) {
    console.log("usermail expire");
    return;
  }

  let data;
  try {
    data = await $api().auth.codeVerified({
      code: code.value,
      email: cookieEmail.value,
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
    const cookieTimer = useCookie("timerStartTime");
    const cookieEmail = useCookie("userEmail");
    cookieTimer.value = null;
    cookieEmail.value = null;
  }
};

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  console.log(values);
  await tryCodeVerified();
  loading.value = false;
});

const newRegistration = () => {
  emit("cancelCode");
  const cookieTimer = useCookie("timerStartTime");
  const cookieEmail = useCookie("userEmail");
  cookieTimer.value = null;
  cookieEmail.value = null;
};

const clearServerError = () => {
  serverError.value = {
    code: "",
  };
};

const tryResendMailCode = async () => {
  let data;
  try {
    const cookieEmail = useCookie("userEmail");
    data = await $api().auth.resendCodeVerified({
      email: cookieEmail.value,
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
    const cookieEmail = useCookie("userEmail");
    cookieEmail.value = null;
    restartTimer.value = true;
    serverSuccessMessage.value = data.message;
    console.log("dataSuss", data);
  }
};

const resendMailCode = async () => {
  const cookieEmail = useCookie("userEmail");
  const email = cookieEmail.value;
  if (!cookieEmail.value) {
    console.log("usermail expire");
    return;
  }
  await tryResendMailCode();

  function setNewCookie(email) {
    console.log("ee", email);
    const cookieEmail = useCookie("userEmail", {
      maxAge: 3600,
    });
    cookieEmail.value = email;
  }
  setNewCookie(email);
};
</script>

<template>
  <div class="auth__register">
    <p>
      {{
        serverSuccessMessage ? serverSuccessMessage : t("auth.codeSendTitleV2")
      }}
    </p>
    <LazyAuthTimer :restartTimer="restartTimer" />
    <FieldsInput
      v-model="code"
      name="code"
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
    <div class="auth__register__cancel-btns">
      <button class="btn" @click="resendMailCode">
        {{ t("auth.btnResendCode") }}
      </button>
      <button class="btn" @click="newRegistration">
        {{ t("auth.btnNewRegister") }}
      </button>
    </div>
  </div>
</template>
