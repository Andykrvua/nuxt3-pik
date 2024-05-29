<script setup>
import * as yup from "yup";
import { useAuthStore } from "~/store/auth";
import { useModalStore } from "~/store/modal";

const authStore = useAuthStore();
const modalStore = useModalStore();
const { t } = useI18n();
const loading = ref(false);
const serverError = ref({
  entityName: "",
  entityCode: "",
  message: "",
});

const schema = yup.object({
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
  validationSchema: schema,
  initialValues: {
    entityName: "",
    entityCode: "",
  },
});

const { value: entityName, errorMessage: entityNameError } =
  useField("entityName");
const { value: entityCode, errorMessage: entityCodeError } =
  useField("entityCode");

const isValid = useIsFormValid();

const tryEntity = async (val = null) => {
  let data;
  try {
    data = await $api().profile.setProfile({
      company: val === "del" ? "" : entityName.value,
      edrpou: val === "del" ? "" : entityCode.value.toString(),
    });
  } catch (error) {
    data = error.data;
  }

  if (data.errors) {
    console.log("dataErr", data);
    serverError.value.entityName = data.errors?.company
      ? data.errors.company
      : "";
    serverError.value.entityCode = data.errors?.edrpou
      ? data.errors.edrpou
      : "";

    if (data?.message) {
      serverError.value.message = data.message;
    } else {
      serverError.value.message = t("validate.serverUnknownErrorMess");
    }
  } else {
    console.log("dataSuss", data);
    modalStore.entity = false;
    await getProfile();
  }
};

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  console.log(values);
  await tryEntity();
  loading.value = false;
});

const delEntity = async () => {
  loading.value = true;
  await tryEntity("del");

  loading.value = false;
  entityName.value = "";
  entityCode.value = "";
};

const clearServerError = () => {
  serverError.value = {
    entityName: "",
    entityCode: "",
    message: "",
  };
};
</script>

<template>
  <div class="entity">
    <button class="btn btn-entity" @click="modalStore.entity = true">
      {{
        authStore.userData?.company && authStore.userData?.edrpou
          ? t("account.btnChangeEntityPhys")
          : t("account.btnChangePhysEntity")
      }}
    </button>
    <div>
      <p>
        {{
          authStore.userData?.company && authStore.userData?.edrpou
            ? t("account.changeEntityPhys")
            : t("account.changePhysEntity")
        }}
      </p>
    </div>
    <PopupsModal v-model="modalStore.entity" :customClass="'entity-modal'">
      <p class="title">
        {{
          authStore.userData?.company && authStore.userData?.edrpou
            ? t("account.changeEntityPhysModalTitle")
            : t("account.changeEntityModalTitle")
        }}
      </p>
      <template
        v-if="authStore.userData?.company && authStore.userData?.edrpou"
      >
        <button class="btn btn-send" :disabled="loading" @click="delEntity()">
          {{ t("common.btnApply") }}
        </button>
      </template>
      <template v-else>
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
        <p v-if="serverError.message" class="base-error">
          {{ serverError.message }}
        </p>
        <button
          class="btn btn-send"
          :disabled="!isValid || loading"
          @click="onSubmit()"
        >
          {{ t("common.btnApply") }}
        </button>
      </template>
    </PopupsModal>
  </div>
</template>
