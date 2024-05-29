<script setup>
const props = defineProps({
  restartTimer: {
    type: Boolean,
    default: false,
  },
});

const timeLeft = ref(0);
const intervalId = ref(null);
const cookieTimer = useCookie("timerStartTime");

const startCountdown = (val = "") => {
  let startTime;

  if (val) {
    startTime = Date.now();
    clearInterval(intervalId.value);
  } else {
    startTime = cookieTimer.value || Date.now();
  }

  cookieTimer.value = startTime;
  const endTime = startTime + 60 * 60 * 1000; // 60 minutes
  const currentTime = Date.now();

  if (currentTime >= endTime) {
    timeLeft.value = 0;
    cookieTimer.value = null;
    return;
  }

  timeLeft.value = endTime - currentTime;

  intervalId.value = setInterval(() => {
    const currentTime = Date.now();
    const timeRemaining = endTime - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(intervalId.value);
      timeLeft.value = 0;
    } else {
      timeLeft.value = timeRemaining;
    }
  }, 1000);
};

const formatTime = (milliseconds) => {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

watch(timeLeft, (newValue) => {
  if (newValue === 0) {
    clearInterval(intervalId.value);
    cookieTimer.value = null;
  }
});

watch(
  () => props.restartTimer,
  (newValue) => {
    if (props.restartTimer) {
      startCountdown("now");
    }
  }
);

onMounted(() => {
  startCountdown();
});
</script>

<template>
  <div>
    <p v-if="timeLeft > 0" style="padding-block: 24px">
      {{ formatTime(timeLeft) }}
    </p>
    <p v-else style="color: var(--color-accent); padding-block: 24px">
      {{ $t("auth.codeExpiredTitle") }}
    </p>
  </div>
</template>
