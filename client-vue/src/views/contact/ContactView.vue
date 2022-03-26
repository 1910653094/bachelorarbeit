<template>
  <div class="contact-container">
    <ProgressBar :titles="titles" v-bind="stepObj" :onSubmit="handleSubmit" >
      <FormContent v-if="stepObj.step === 0" v-bind="form" />
      <CalendarContent v-if="stepObj.step === 1" />
      <CheckContent v-if="stepObj.step === 2" v-bind="form" :date="date" />
    </ProgressBar>
  </div>
</template>

<script>
import { ProgressBar } from '@/components';
import { CalendarContent, CheckContent, FormContent } from './progressbar-content';

export default {
  name: 'ContactView',
  components: { CheckContent, CalendarContent, FormContent, ProgressBar },
  data() {
    return {
      form: {
        company: '',
        setCompany: (value) => this.form.company = value,
        name: '',
        setName: (value) => this.form.name = value,
        email: '',
        setEmail: (value) => this.form.email = value,
        description: '',
        setDescription: (value) => this.form.description = value,
      },
      date: {
        key: '',
        from: '',
        until: '',
      },
      titles: ['Form', 'Calendar', 'Finish'],
      stepObj: {
        step: 0,
        increment: () => ++this.stepObj.step,
        decrement: () => --this.stepObj.step,
      },
    };
  },
  methods: {
    handleSubmit() {
      // submit
      console.log('submit');
    },
  }
};
</script>

<style scoped>
input, textarea {
  background-color: var(--background-color);
  color: var(--secondary-color);
  border: 1px solid var(--tertiary-color);
  outline: none;
}

.contact-container {
  width: 100%;
  display: flex;
  color: #222222;
  overflow-y: hidden;
}

</style>
