<template>
  <div :class="'calendar ' + className">
    <div class="calendar-nav">
      <h2>{{ months[date.month] + ' ' + date.year }}</h2>
      <div class="date">
        <div id="prev" @click="previousMonth" />
        <div id="now" @click="thisMonth">Today</div>
        <div id="next" @click="nextMonth" />
      </div>
    </div>
    <div class="calendar-grid">
      <div class="thead" v-for="(day, idx) in days" :key="idx">{{ day }}</div>
      <div
          v-for="day in daysForCalendar(date.year, date.month)"
          :key="day.key"
          :class="(day.todayClass ? 'today ' : '') + (day.day === 6 ? 'grey ' : '') + (day.key === selected ? 'selected ' : '')"
          @click="handleClick(day.key)"
      >
        <span v-if="availableDays.includes(day.key)" class="circle"></span>
        {{ day.date }}
        {{ day.date === 1 ? '. ' + day.month : '' }}
      </div>
    </div>
  </div>
</template>

<script>
import { germanDateStringToDate } from '@/utils';

export default {
  name: 'Calendar',
  props: {
    availableDays: Array,
    className: String,
    selected: String,
    setSelected: Function,
  },
  data() {
    return {
      months: [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'October', 'September', 'October', 'November', 'December'
      ],
      days: [
        'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'
      ],
      date: {
        month: 0,
        year: 0,
      },
    };
  },
  mounted() {
    this.thisMonth();
  },
  methods: {
    previousMonth() {
      const { month, year } = this.date;
      this.date = {
        month: month < 1 ? 11 : month - 1,
        year: month < 1 ? year - 1 : year,
      };
    },
    thisMonth() {
      const today = new Date();
      this.date = {
        month: today.getMonth(),
        year: today.getFullYear()
      };
    },
    nextMonth() {
      const { month, year } = this.date;
      this.date = {
        month: month > 10 ? 0 : month + 1,
        year: month > 10 ? year + 1 : year,
      };
    },
    getCorrectDay(year, month, i) {
      let day = new Date(year, month, i).getDay();
      day = day === 0 ? 6 : day - 1;
      return day;
    },
    daysForCalendar(year, month) {
      const daysArr = [];
      const totalDaysMonth = new Date(this.date.year, this.date.month + 1, 0).getDate();
      const totalDaysPrevMonth = new Date(this.date.year, this.date.month, 0).getDate();

      let firstDay = new Date(year, month).getDay();
      firstDay = firstDay === 0 ? 6 : firstDay - 1;

      for (let i = 1; i <= firstDay; i++) {
        const prevMonthDate = totalDaysPrevMonth - firstDay + i;
        const key = new Date(this.date.year, this.date.month - 1, prevMonthDate).toLocaleDateString('de-DE');
        daysArr.push({
          date: prevMonthDate,
          key: key,
          month: '',
          day: i-1,
          todayClass: false,
        });
      }

      const today = new Date();
      for (let i = 1; i <= totalDaysMonth; i++) {
        const key = new Date(this.date.year, this.date.month, i).toLocaleDateString('de-DE');
        const day = this.getCorrectDay(year, month, i);

        const todayClass = i === today.getDate() && month === today.getMonth() && year === today.getFullYear()
        daysArr.push({
          date: i,
          key: key,
          day: day,
          month: this.months[month].substring(0, 3),
          todayClass: todayClass,
        });
      }

      const gridsize = 42;
      // If there is space left over in the grid, then show the dates for the next month
      if (daysArr.length < gridsize) {
        const count = gridsize - daysArr.length;
        for (let i = 1; i <= count; i++) {
          const key = new Date(this.date.year, this.date.month + 1, i).toLocaleDateString('de-DE');
          const day = this.getCorrectDay(year, month + 1, i);
          const nextMonth = month + 1 > 11 ? 0 : month + 1;
          daysArr.push({
            date: i,
            key: key,
            day: day,
            month: this.months[nextMonth].substring(0, 3),
            todayClass: false,
          });
        }
      }

      return daysArr;
    },
    handleClick(key) {
      const date = germanDateStringToDate(key);
      const day = date.getDay();
      this.setSelected(day === 0 ? '' : key);
    },
  },
};
</script>

<style scoped>
div.calendar {
  width: 60%;
  border: 1px solid var(--tertiary-color);
}
div.calendar.home-calendar {
  margin-left: 2rem;
}

.calendar-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.calendar-nav > h2 {
  margin: 0 0 0 10px;
  color: var(--primary-color);
}
.date {
  display: block;
  font-size: 0;
  vertical-align: middle;
}
.date:hover {
  cursor: pointer;
}
.date > div {
  color: var(--primary-color);
  font-size: 12px;
  display: inline-block;
}
div#prev::before, div#next::after, div#now {
  width: 16px;
  height: 16px;
  display: inline-block;
  border: 1px solid var(--tertiary-color);
  text-align: center;
  border-radius: 4px;
  padding: 1px 1px 1px;
  font-weight: normal;
}
div#prev::before {
  content: '<';
}
div#now {
  width: 50px;
  height: 20px;
}
div#next::after {
  content: '>';
  margin-right: 10px;
}
.step-content-container div#now {
  height: unset; /* WHY?? */
}

.calendar-grid {
  display: grid;
  width: 100%;
  height: 450px;
  grid-template-columns: repeat(7, calc(100% / 7));
  text-align: end;
}

.calendar-grid div {
  outline: 1px solid var(--tertiary-color);
  background-color: var(--background-color);
  color: var(--primary-color);
  padding: 3px 7px 40px 0;
}
.calendar-grid > div.thead {
  outline: none;
  border-bottom: 1px solid var(--tertiary-color);
  padding: 2px 4px 0 0;
}

.today {
  color: var(--interactive-color) !important;
  font-weight: bold;
}

.selected {
  background-color: var(--interactive-color) !important;
}

.today.selected {
  color: var(--background-color) !important;
}


.grey {
  background-color: var(--background-second) !important;
}

.circle:before {
  content: ' \25CF';
  color: var(--primary-color);
}
</style>
