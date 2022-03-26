<template>
  <StepContentWrapper direction="row" alignment="center">
    <Calendar
        :selected="selected"
        :setSelected="setSelected"
        :availableDays="data.map(d => d.date.toLocaleDateString())"
    />
    <div class="possibilities-container">
      <p>Choose a date for a meeting</p>
      <Card
          v-for="(d, idx) in possibilities"
          :key="idx"
          :dateObj="d"
          :idx="idx"
          :selection="selectedCard[idx]"
          :onChange="setSelectedCard"
      />
    </div>
  </StepContentWrapper>
</template>

<script>
import { Calendar, Card } from '@/components';
import { fetchData } from '@/utils';
import { StepContentWrapper } from '@/layouts';

export default {
  name: 'CalendarContent',
  components: { Calendar, Card, StepContentWrapper },
  props: {
    setDate: Function
  },
  data() {
    return {
      selected: '',
      setSelected: (value) => this.selected = value,
      data: [],
      possibilities: [],
      selectedCard: [],
    }
  },
  mounted() {
    fetchData(process.env.VUE_APP_BACKEND_URL + '/dates?email=fabian.peyrat01@gmail.com')
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
  methods: {
    watchMethod() {
      const newData = []
          .concat(this.data)
          .map(d => ({ ...d, key: d.date.toLocaleDateString() }))
          .filter(d => d.key === this.selected);
      this.possibilities = newData;
      this.selectedCard = [...Array(newData.length).keys()].map(() => false);
    },
    setSelectedCard(idx) {
      let prev = [...this.selectedCard].map(() => false);
      prev[idx] = true;
      this.selectedCard = prev;
      this.setDate(this.possibilities[idx]);
    },
  },
  watch: {
    selected: function() {
      this.watchMethod();
    },
    data: function() {
      this.watchMethod();
    },
  },
};
</script>

<style scoped>
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

.possibilities-container > p {
  width: 70%;
}
</style>
