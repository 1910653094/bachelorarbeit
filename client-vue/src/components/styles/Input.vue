<template>
  <div class="custom-input" :style="{ maxWidth: maxWidth }">
    <div class="input-title">
      {{ title }}
    </div>

    <div
        v-if="type === 'password'"
        class="password-container">
      <input
          :type="visible ? 'text' : 'password'"
          :placeholder="placeholder"
          :value="value"
          @change="onChange"
          id="password">

      <EyeOnIcon v-if="visible" height="25" @click="handleClick"/>
      <EyeOffIcon v-else height="25" @click="handleClick"/>
    </div>
    <input
        v-else
        :class="error ?? 'input-error'"
        :type="type"
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
import { EyeOffIcon, EyeOnIcon } from '@/assets';

export default {
  name: 'Input',
  props: {
    title: String,
    placeholder: String,
    value: String,
    onChange: Function,
    type: String,
    errorMessage: String,
    error: {
      default: false,
      type: Boolean
    },
    maxWidth: {
      default: 320,
      type: Number
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    handleClick() {
      this.visible = !this.visible;
    }
  },
  components: { EyeOnIcon, EyeOffIcon },
};
</script>

<style scoped>
@import '../../assets/styles/input.css';
</style>
