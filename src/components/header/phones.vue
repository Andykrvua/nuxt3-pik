<script setup>
import { useStaticStore } from "~/store/static";

const staticStore = useStaticStore();

const isDropdownOpen = ref(false);
const phonesEl = ref(false);
const focusablePhonesEl = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

onClickOutside(phonesEl, (event) => (isDropdownOpen.value = false));

const addFocusClass = () => {
  focusablePhonesEl.value.classList.add("nonfocusable");
};

const removeFocusClass = () => {
  focusablePhonesEl.value.classList.remove("nonfocusable");
};

let firstPhone;
let allPhones = [];
let height = "-63px";

if (staticStore.phones) {
  firstPhone = staticStore.phones[0].number;
  allPhones = staticStore.phones;
  height = `-${allPhones.length * 22}px`;
}
</script>

<template>
  <div
    class="header__phones"
    :class="{ open: isDropdownOpen }"
    ref="phonesEl"
    :style="{ '--height': height }"
  >
    <div
      v-if="firstPhone"
      ref="focusablePhonesEl"
      @focus="addFocusClass"
      @blur="removeFocusClass"
      @click="toggleDropdown"
      tabindex="0"
      @keydown.space.prevent="toggleDropdown"
      class="btn header__phones-btn"
    >
      <span class="header__phones-btn-texts">
        <span class="header__btn-title">{{
          $t("header.phoneBlockTitle")
        }}</span>
        <a
          :href="`tel:${cleanedPhone(firstPhone)}`"
          @click.stop
          class="header__btn-subtitle"
          >{{ firstPhone }}</a
        >
      </span>
      <BaseIconSvg iconName="triangle-down" width="9" height="7" />
    </div>
    <div
      :class="{ active: isDropdownOpen }"
      class="header__phones-content"
      v-if="allPhones.length > 1"
    >
      <template v-for="(phone, ind) in allPhones" :key="ind">
        <a
          v-if="ind !== 0"
          :href="`tel:${cleanedPhone(phone.number)}`"
          class="header__btn-subtitle"
          >{{ phone.number }}</a
        >
      </template>
    </div>
  </div>
</template>
