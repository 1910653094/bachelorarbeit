<template>
  <div class="custom-input" :style="{ maxWidth: maxWidth }">
    <div class="input-title">
      {{ title }}
    </div>

    <textarea
        :cols="cols"
        :rows="rows"
        :placeholder="placeholder"
        :value="value"
        @change="onChange"
    />

    <div class="error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextArea',
  props: {
    title: String,
    placeholder: String,
    value: String,
    onChange: Function,
    errorMessage: String,
    maxWidth: {
      default: 320,
      type: Number
    },
    cols: Number,
    rows: Number,
  },
};
</script>

<style scoped>
@import '../../assets/styles/input.css';
</style>
