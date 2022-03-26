<template>
  <div class="progressbar-container">
    <ul class="progressbar">
      <li v-for="(titles, i) in titles" :class="i <= step ? 'active' : ''" >{{ titles }}</li>
    </ul>
    <div class="progressbar-content">
      <slot>No content</slot>
    </div>
    <div class="progressbar-footer">
      <div>
        <Button bgColor="var(--tertiary-color)" :disabled="step === 0" :onClick="handlePrev">Prev</Button>
      </div>
      <div>
        <Button :onClick="handleNext">
          {{ step === titles.length - 1 ? 'Submit' : 'Next' }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from '@/components';

export default {
  name: 'ProgressBar',
  props: {
    step: Number,
    increment: Function,
    decrement: Function,
    titles: Array,
    onSubmit: Function,
  },
  components: { Button },
  methods: {
    handlePrev() {
      this.decrement();
    },
    handleNext() {
      if (this.step === this.titles.length - 1) {
        this.onSubmit();
        return;
      }
      this.increment();
    },
  }
};
</script>

<style scoped>
.progressbar-container {
  width: 90%;
  position: absolute;
  z-index: 1;
  color: var(--primary-color);
  margin: 0 5%;
}

.progressbar {
  counter-reset: step;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
}

.progressbar li {
  float: left;
  width: 20%;
  position: relative;
  text-align: center;
  list-style-type: none;
}

.progressbar li:before {
  content: counter(step);
  counter-increment: step;
  width: 30px;
  height: 30px;
  border: 2px solid var(--secondary-color);
  display: block;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  line-height: 27px;
  background: var(--background-color);
  color: var(--secondary-color);
  text-align: center;
  font-weight: bold;
}

.progressbar li:after {
  content: '';
  position: absolute;
  width:100%;
  height: 3px;
  background: var(--tertiary-color);
  top: 15px;
  left: -50%;
  z-index: -1;
}

.progressbar li:first-child:after{
  content: none;
}

.progressbar li.active:after {
  background: var(--interactive-color);
}

.progressbar li.active:before {
  border-color: var(--secondary-color);
  background: var(--interactive-color);
  color: var(--secondary-color);
}

.progressbar-footer {
  display: flex;
  justify-content: space-between;
}
</style>
