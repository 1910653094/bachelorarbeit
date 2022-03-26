<template>
  <div class="step-content-container" :style="{ flexDirection: direction, alignItems: alignment }">
    <slot>No content</slot>
  </div>
</template>

<script>
export default {
  name: 'StepContentWrapper',
  props: {
    alignment: {
      default: 'flex-start',
    },
    direction: {
      default: 'column',
    },
  }
};
</script>

<style scoped>
.step-content-container {
  height: 70vh;
  display: flex;
  color: var(--primary-color);
}
</style>
