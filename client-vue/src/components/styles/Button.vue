<template>
  <button :class="'actn-btn ' + className" @click="onClick" :disabled="disabled">
    <slot>No content</slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    onClick: Function,
    className: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.actn-btn {
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0.01em;
  color: var(--background-color);
  width: 100%;
  padding: 1rem 1.8rem;
  text-align: left;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: var(--primary-color);
}

.actn-btn.secondary {
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  background-color: var(--background-color);
}

.actn-btn:hover {
  opacity: 0.9;
  background-color: var(--interactive-color) !important;
}

.actn-btn:active {
  opacity: 1;
}
</style>
