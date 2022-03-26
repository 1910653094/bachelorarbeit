<template>
  <div class="contact-container">
    <ProgressBar :titles="titles" v-bind="stepObj" :onSubmit="handleSubmit" >
      <FormContent v-if="stepObj.step === 0" v-bind="form" />
      <CalendarContent v-if="stepObj.step === 1" :setDate="setDate" />
      <CheckContent v-if="stepObj.step === 2" v-bind="form" :date="date" />
    </ProgressBar>
  </div>
</template>

<script>
import { ProgressBar } from '@/components';
import { CalendarContent, CheckContent, FormContent } from './progressbar-content';
import {fetchData} from "../../../../client-react/src/utils";

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
        date: Date,
        key: '',
        from: '',
        until: '',
      },
      setDate: ({ date, from, key, until }) => {
        this.date = { date, from, key, until };
      },
      titles: ['Form', 'Calendar', 'Finish'],
      stepObj: {
        step: 0,
        increment: () => this.validateStep(),
        decrement: () => --this.stepObj.step,
      },
    };
  },
  methods: {
    validateStep() {
      if (this.stepObj.step === 0) {
        const checks = ['company', 'name', 'email', 'description'].map(key => {
          return this.form[key] !== '';
        });
        if (checks.includes(false)) {
          alert('Please fill out all fields first');
          return;
        }
      } else {
        if (!this.date.key || !this.date.from) {
          alert('Please select a date (click on calendar)\n' +
              'and a time first (click on a card)');
          return;
        }
      }
      ++this.stepObj.step;
    },
    handleSubmit() {
      const user = JSON.stringify({
        email: 'fabian.peyrat01@gmail.com',
        date: {
          date: this.date.date,
          hours: {
            from: this.date.from,
            until: this.date.until
          }
        },
        company: this.form.company,
        contact_name: this.form.name,
        contact_email: this.form.email,
        description: this.form.description
      });
      fetchData(process.env.VUE_APP_BACKEND_URL + '/dates/check', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: user,
      })
          .then(res => res.json())
          .then(data => {
            console.info(data.success);
            this.$router.push({ name: 'MyCV' });
          }).catch(err => {
        console.error(err);
        alert('We are very sorry but an error occurred.\nPlease try again!')
      });
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
