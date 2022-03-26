<template>
  <div class="home-header">
    <h1>Meeting dates</h1>
    <p>Add dates to indicate that you have time for a meeting on this day and time</p>
  </div>
  <StepContentWrapper direction="row" alignment="center">
    <Calendar
        className="home-calendar"
        :availableDays="data.map(d => d.date.toLocaleDateString())"
        :selected="selected"
        :setSelected="setSelected"
    />
    <div class="possibilities-container">
      <Card v-if="selected" :dateObj="{ key: selected }" :setPossibilities="addPossibility"/>
      <Card
          v-for="(d, idx) in possibilities"
          :dateObj="d"
          :idx="idx"
          :key="idx"
          :setPossibilities="deletePossibility"
      />
    </div>
  </StepContentWrapper>
</template>

<script>
import { auth } from '@/store/auth-store';
import { Calendar, Card } from '@/components';
import { fetchData } from '@/utils';
import { StepContentWrapper } from '@/layouts';

export default {
  name: 'AccountView',
  components: { Calendar, Card, StepContentWrapper },
  data() {
    return {
      selected: '',
      setSelected: (value) => this.selected = value,
      data: [],
      possibilities: [],
    };
  },
  mounted() {
    this.checkLogin();
    fetchData(process.env.VUE_APP_BACKEND_URL + `/dates?email=${ auth.email }`)
        .then(res => res.json())
        .then(data => {
          const merged = [];
          for (const date of data.dates) {
            for (const hour of date.hours) {
              if (hour.available) {
                merged.push({
                  date: new Date(date.date),
                  from: hour.from,
                  until: hour.until
                });
              }
            }
          }
          this.data = merged;
        }).catch(err => console.error(err));
  },
  watch: {
    auth: function() {
      this.checkLogin();
    },
    selected: function () {
      this.watchMethod();
    },
    data: function() {
      this.watchMethod();
    }
  },
  methods: {
    checkLogin() {
      if (!auth.token) {
        this.$router.push({ name: 'Login' });
      }
    },
    watchMethod() {
      this.possibilities = []
          .concat(this.data)
          .map(d => ({...d, key: d.date.toLocaleDateString()}))
          .filter(d => d.key === this.selected);
    },
    addPossibility(value) {
      this.possibilities.push(value);
      this.data.push(value);
    },
    deletePossibility(idx) {
      const obj = this.possibilities[idx];
      this.data = this.data.filter(d => JSON.stringify(d) !== JSON.stringify(obj));
      this.possibilities.splice(idx, 1);
    }
  },
};
</script>

<style scoped>
.home-header {
  display: flex;
  flex-direction: column;
  align-items: start;

  margin-left: 2rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.possibilities-container {
  width: 40%;
  height: 95%;

  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: start;

  overflow-y: scroll;
  margin: 50px 0;
}
</style>
