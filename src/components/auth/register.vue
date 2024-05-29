<script setup>
import * as yup from "yup";
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const { t } = useI18n();
const entity = ref(false);
const loading = ref(false);

const cookieTimer = useCookie("timerStartTime");

const codeVerified = ref(cookieTimer.value);
const passwordFieldType = ref("password");
const serverError = ref({
  email: "",
  password: "",
  name: "",
  lastname: "",
  entityName: "",
  entityCode: "",
  message: "",
});

const validationSchema = {
  email: yup
    .string()
    .matches(emailReg, t("validate.authEmail"))
    .required(t("validate.authEmailDefault")),
  name: yup
    .string()
    .min(2, t("validate.authName"))
    .required(t("validate.authNameDefault")),
  lastName: yup
    .string()
    .min(2, t("validate.authLastName"))
    .required(t("validate.authLastNameDefault")),
  password: yup
    .string()
    .min(4, t("validate.authPassw"))
    .required(t("validate.authPasswDefault")),
};

const schema = yup.object(validationSchema);

const schemaEntity = yup.object({
  ...validationSchema,
  entityName: yup
    .string()
    .min(6, t("validate.authEntityName"))
    .required(t("validate.authEntityNameDefault")),
  entityCode: yup
    .string()
    .matches(/^\d{8}$/, t("validate.authEntityCode"))
    .required(t("validate.authEntityCodeDefault")),
});

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: computed(() => (entity.value ? schemaEntity : schema)),
  initialValues: {
    email: "",
    name: "",
    lastName: "",
    password: "",
  },
});

const { value: email, errorMessage: emailError } = useField("email");
const { value: name, errorMessage: nameError } = useField("name");
const { value: lastName, errorMessage: lastNameError } = useField("lastName");
const { value: password, errorMessage: passwordError } = useField("password");
const { value: entityName, errorMessage: entityNameError } =
  useField("entityName");
const { value: entityCode, errorMessage: entityCodeError } =
  useField("entityCode");

const isValid = useIsFormValid();

const tryRegister = async () => {
  let data;
  try {
    data = await $api().auth.register({
      email: email.value,
      name: name.value,
      lastname: lastName.value,
      password: password.value,
      company: entityName.value ? entityName.value : "",
      edrpou: entityCode.value ? entityCode.value.toString() : "",
    });
  } catch (error) {
    data = error.data;
  }

  if (data.errors) {
    console.log("dataErr", data);
    serverError.value.email = data.errors?.email ? data.errors.email : "";
    serverError.value.name = data.errors?.name ? data.errors.name : "";
    serverError.value.lastname = data.errors?.lastname
      ? data.errors.lastname
      : "";
    serverError.value.entityName = data.errors?.entityName
      ? data.errors.entityName
      : "";
    serverError.value.entityCode = data.errors?.entityCode
      ? data.errors.entityName
      : "";
    serverError.value.password = data.errors?.password
      ? data.errors.password
      : "";

    if (data?.message) {
      serverError.value.message = data.message;
    } else {
      serverError.value.message = t("validate.serverUnknownErrorMess");
    }
  } else {
    if (data.status === "unverified") {
      codeVerified.value = true;
      const cookieEmail = useCookie("userEmail", {
        maxAge: 3600,
      });
      cookieEmail.value = email.value;
    }
    console.log("dataSuss", data);
  }
};

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  console.log(values);
  await tryRegister();
  loading.value = false;
});

const handleClickIcon = () => {
  passwordFieldType.value === "password"
    ? (passwordFieldType.value = "text")
    : (passwordFieldType.value = "password");
};

const cancelCodeHandler = () => {
  codeVerified.value = false;
};

const clearServerError = () => {
  serverError.value = {
    email: "",
    password: "",
    name: "",
    lastname: "",
    entityName: "",
    entityCode: "",
    message: "",
  };
};
</script>

<template>
  <div class="auth__register">
    <transition name="my" mode="out-in">
      <div v-if="!codeVerified">
        <FieldsInput
          class="base"
          v-model="email"
          name="email"
          :label="t('auth.inputLabelEmail')"
          :error="emailError || serverError.email"
          @input:focus="clearServerError"
        />
        <FieldsInput
          v-model="name"
          name="name"
          class="base"
          :label="t('auth.inputLabelName')"
          :error="nameError || serverError.name"
          @input:focus="clearServerError"
        />
        <FieldsInput
          v-model="lastName"
          name="lastName"
          class="base"
          :label="t('auth.inputLabelLastName')"
          :error="lastNameError || serverError.lastname"
          @input:focus="clearServerError"
        />
        <FieldsInput
          v-model="password"
          name="password"
          :type="passwordFieldType"
          class="base"
          :label="t('auth.inputLabelComePassw')"
          :error="passwordError || serverError.password"
          @input:focus="clearServerError"
          :iconName="'visibility'"
          @clickIcon="handleClickIcon"
        />
        <FieldsCheckbox
          v-model:checked="entity"
          name="entity"
          :label="t('auth.checkboxLabelEntity')"
          :error="nameError"
        />

        <Collaps v-model="entity">
          <template #body>
            <div class="collapse-content">
              <FieldsInput
                class="base"
                v-model="entityName"
                name="entityName"
                :placeholder="`ПП &quot;Store&quot;`"
                :label="t('auth.inputLabelEntityName')"
                :error="entityNameError || serverError.entityName"
                @input:focus="clearServerError"
              />
              <FieldsInput
                v-model="entityCode"
                name="entityCode"
                :type="'number'"
                class="base"
                :label="t('auth.inputLabelEntityCode')"
                :error="entityCodeError || serverError.entityCode"
                @input:focus="clearServerError"
              />
            </div>
          </template>
        </Collaps>
        <p v-if="serverError.message" class="base-error">
          {{ serverError.message }}
        </p>
        <button
          class="btn btn-buy"
          :disabled="!isValid || loading"
          @click="onSubmit()"
        >
          {{ t("auth.btnRegister") }}
        </button>
      </div>
      <div v-else>
        <AuthVerifiedCode @cancelCode="cancelCodeHandler" />
      </div>
    </transition>
  </div>
</template>
