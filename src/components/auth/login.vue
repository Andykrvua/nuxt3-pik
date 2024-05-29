<script setup>
import * as yup from "yup";
import { useAuthStore } from "~/store/auth";
import { useModalStore } from "~/store/modal";

const authStore = useAuthStore();
const modalStore = useModalStore();
const { t } = useI18n();
const loading = ref(false);
const forgotPass = ref(false);
const serverError = ref({ email: "", password: "", message: "" });
const passwordFieldType = ref("password");
const activateAfterLogin = ref(false);

const schema = yup.object({
  email2: yup
    .string()
    .matches(emailReg, t("validate.authEmail"))
    .required(t("validate.authEmailDefault")),
  password2: yup
    .string()
    .min(4, t("validate.authPassw"))
    .required(t("validate.authPasswDefault")),
});

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    email2: "",
    password2: "",
  },
});

const { value: email2, errorMessage: emailError } = useField("email2");
const { value: password2, errorMessage: passwordError } = useField("password2");

const isValid = useIsFormValid();

const tryLogin = async () => {
  let data;
  try {
    data = await $api().auth.login({
      email: email2.value,
      password: password2.value,
    });
  } catch (error) {
    data = error.data;
  }

  if (data.errors) {
    console.log("dataErr", data);
    serverError.value.email = data.errors?.email ? data.errors.email : "";
    serverError.value.password = data.errors?.password
      ? data.errors.password
      : "";

    if (data?.message && data?.status !== 404 && data?.status !== 403) {
      serverError.value.message = data.message;
    } else if (data?.status === 404) {
      serverError.value.message = t("validate.serverCheckValidAuthErrorMess");
    } else if (data?.status === 403) {
      serverError.value.message = data.message;
      console.log("login non activated account");
      activateAfterLogin.value = true;
    } else {
      serverError.value.message = t("validate.serverUnknownErrorMess");
    }
  } else {
    if (data.status === "active") {
      // login
      authStore.setUserdata({
        ...data.data.user,
      });
      authStore.setToken({
        token: data.data.access_token,
        expires: data.data.expires_seconds,
      });
      modalStore.toggleAuth();
    } else {
      // send again email code
    }
    console.log("dataSuss", data);
  }
};

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  await tryLogin();
  loading.value = false;
});

const handleClickIcon = () => {
  passwordFieldType.value === "password"
    ? (passwordFieldType.value = "text")
    : (passwordFieldType.value = "password");
};

const clearServerError = () => {
  serverError.value = { email: "", password: "", message: "" };
};

const setSocialError = (error) => {
  serverError.value.message = error;
};
</script>

<template>
  <div class="auth__login">
    <transition name="my" mode="out-in" v-if="!activateAfterLogin">
      <div v-if="!forgotPass">
        <FieldsInput
          class="base"
          v-model="email2"
          name="email2"
          :label="t('auth.inputLabelEmail')"
          :error="emailError || serverError.email"
          @input:focus="clearServerError"
        />
        <div>
          <FieldsInput
            v-model="password2"
            name="password2"
            :type="passwordFieldType"
            class="base"
            :label="t('auth.inputLabelPassw')"
            :error="passwordError || serverError.password"
            :iconName="'visibility'"
            @clickIcon="handleClickIcon"
            @input:focus="clearServerError"
          />
          <button class="btn btn-restore-pass" @click="forgotPass = true">
            {{ t("auth.btnPasswRemember") }}
          </button>
        </div>
        <p v-if="serverError.message" class="base-error">
          {{ serverError.message }}
        </p>
        <button
          class="btn btn-buy"
          :disabled="!isValid || loading"
          @click="onSubmit()"
        >
          {{ t("auth.btnLogin") }}
        </button>
        <span>{{ t("auth.textLoginAnd") }}</span>
        <AuthGoogleLogin @update:error="setSocialError" />
        <AuthFacebookLogin />
      </div>
      <LazyAuthForgotPassw v-else @back="forgotPass = false" />
    </transition>
    <div v-else>
      <LazyAuthActivateAfterLogin
        :email="email2"
        v-if="activateAfterLogin && email2"
      />
      <button class="btn forgot-pass" @click="activateAfterLogin = false">
        {{ t("auth.btnBack") }}
      </button>
    </div>
  </div>
</template>
