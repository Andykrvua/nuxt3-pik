<script setup>
import * as yup from "yup";
import { useAuthStore } from "~/store/auth";
import { vMaska } from "maska";

const emit = defineEmits(["update:value"]);
const authStore = useAuthStore();
const { t } = useI18n();

const loading = ref(false);
const serverError = ref({
  email: "",
  name: "",
  lastname: "",
  surname: "",
  phone: "",
  entityName: "",
  entityCode: "",
  message: "",
});

const schema = yup.object({
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
  surName: yup
    .string()
    .min(6, t("validate.authSurName"))
    .required(t("validate.authSurNameDefault")),
  phone: yup
    .string()
    .matches(/^\+?\d{2} \(\d{3}\) \d{3}-\d{2}-\d{2}$/, t("validate.authPhone"))
    .required(t("validate.authPhoneDefault")),
});

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    email: authStore.userData?.email || "",
    name: authStore.userData?.name || "",
    lastName: authStore.userData?.lastname || "",
    surName: authStore.userData?.surname || "",
    phone: authStore.userData?.phone || "",
  },
});

const { value: email, errorMessage: emailError } = useField("email");
const { value: phone, errorMessage: phoneError } = useField("phone");
const { value: name, errorMessage: nameError } = useField("name");
const { value: lastName, errorMessage: lastNameError } = useField("lastName");
const { value: surName, errorMessage: surNameError } = useField("surName");
const { value: entityName, errorMessage: entityNameError } =
  useField("entityName");
const { value: entityCode, errorMessage: entityCodeError } =
  useField("entityCode");

const isValid = useIsFormValid();

const updateUserData = async () => {
  let data;

  let copyPhone = phone.value;
  let phoneNumbers = copyPhone.replace(/\D/g, "");
  let phoneRaw = phoneNumbers.slice(3);
  console.log(phoneRaw); // Выведет "503562285"

  try {
    data = await $api().profile.setProfile({
      email: email.value,
      name: name.value,
      lastname: lastName.value,
      surname: surName.value,
      phone: phoneRaw,
    });
  } catch (error) {
    data = error.data;
  }

  if (data.errors) {
    console.log("dataErr", data);

    serverError.value.email = data.errors?.email || "";
    serverError.value.name = data.errors?.name || "";
    serverError.value.lastname = data.errors?.lastname || "";
    serverError.value.surname = data.errors?.surname || "";
    serverError.value.phone = data.errors?.phone || "";
    // serverError.value.entityName = data.errors?.entityName
    //   ? data.errors.entityName
    //   : "";
    // serverError.value.entityCode = data.errors?.entityCode
    //   ? data.errors.entityName
    //   : "";

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
  await updateUserData();
  loading.value = false;
});

const clearServerError = () => {
  serverError.value = {
    email: "",
    name: "",
    lastname: "",
    surname: "",
    phone: "",
    entityName: "",
    entityCode: "",
    message: "",
  };
};

const editHandler = () => {
  emit("update:value", false);
};
</script>

<template>
  <div class="profile-data-edit">
    <FieldsInput
      v-model="lastName"
      name="lastName"
      class="base"
      :label="t('auth.inputLabelLastName')"
      :error="lastNameError || serverError.lastname"
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
      v-model="surName"
      name="surName"
      class="base"
      :label="t('auth.inputLabelSurName')"
      :error="surNameError || serverError.surname"
      @input:focus="clearServerError"
    />
    <FieldsInput
      class="base"
      v-model="phone"
      name="phone"
      :placeholder="'+38 (0##) ###-##-##'"
      :mask="'+38 (0##) ###-##-##'"
      :label="t('auth.inputLabelPhone')"
      :error="phoneError || serverError.phone"
      @input:focus="clearServerError"
    />
    <FieldsInput
      class="base"
      v-model="email"
      name="email"
      :label="t('auth.inputLabelEmail')"
      :error="emailError || serverError.email"
      @input:focus="clearServerError"
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
