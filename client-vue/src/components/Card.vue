<template>
  <div :class="'card-container' + (idx < 0 ? ' big' : '') + ((fromError || untilError) ? ' big-error' : '')">
    <template v-if="idx >= 0">
      <div :class="'text-container' + (idx >= 0 ? ' unset-height' : '')">
        <div>From: {{ dateObj.from }}</div>
        <div>To: {{ dateObj.until }}</div>
      </div>
      <DeleteIcon v-if="onChange === null" height="25" @click="handleDelete" />
      <input v-else type="radio" :checked="selection" @change="onChange(idx)" />
    </template>
    <template v-else>
      <div class="text-container">
        <Input
            title="From"
            type="text"
            :value="from"
            placeholder="From when"
            :error="fromError"
            :errorMessage="fromError ? 'Wrong format' : ''"
            :onChange="(e) => handleChange(e.target.value, 'from')"
        />
        <Input
            title="Until"
            type="text"
            :value="until"
            placeholder="Until when"
            :error="untilError"
            :errorMessage="untilError ? 'Wrong format' : ''"
            :onChange="(e) => handleChange(e.target.value, 'until')"
        />
      </div>
      <Button @click="handleClick">Save</Button>
    </template>
  </div>
</template>

<script>
import { Button, Input } from '@/components';
import { DeleteIcon } from '@/assets';
import { fetchData, germanDateStringToDate } from '@/utils';
import { auth } from '@/store/auth-store';

export default {
  name: 'Card',
  components: { Button, DeleteIcon, Input },
  props: {
    dateObj: Object,
    idx: {
      type: Number,
      default: -1,
    },
    selection: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function,
      default: null
    },
    setPossibilities: {
      type: Function,
      default: () => {}
    },
  },
  data() {
    return {
      from: '',
      until: '',
      fromError: '',
      untilError: '',
    };
  },
  methods: {
    checkError(value) {
      if (!value) return true;
      return !/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(value);
    },
    handleClick() {
      if (!this.from || !this.until || this.fromError || this.untilError) {
        return;
      }
      const date = germanDateStringToDate(this.dateObj.key);

      const dateJSON = JSON.stringify({
        email: auth.email,
        token: auth.token,
        date: {
          date,
          hours: { from: this.from, until: this.until },
        },
      });
      fetchData(process.env.VUE_APP_BACKEND_URL + '/dates', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: dateJSON,
      })
          .then(res => res.json())
          .then(res => {
            if (res.errors) {
              alert('An error occurred');
              console.error(res.errors);
              return;
            }
            this.setPossibilities({ date, from: this.from, until: this.until });
            this.from = '';
            this.fromError = false;
            this.until = '';
            this.untilError = false;
          });
    },
    handleChange(value, key) {
      this[key] = value;
      this[`${key}Error`] = this.checkError(value);
    },
    handleDelete() {
      const dateJSON = JSON.stringify({
        email: auth.email,
        token: auth.token,
        date: {
          date: this.dateObj.date,
          hours: {
            from: this.dateObj.from,
            until: this.dateObj.until
          },
        },
      });

      fetchData(process.env.VUE_APP_BACKEND_URL + '/dates', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: dateJSON,
      })
          .then(res => res.json())
          .then(res => {
            if (res.errors) {
              alert('An error occurred');
              console.error(res.errors);
              return;
            }
            this.setPossibilities(this.idx);
          });
    },
  },
};
</script>

<style scoped>
.card-container {
  width: 70%;

  border: 1px solid var(--background-second);
  border-radius: .5rem;
  background-color: var(--background-second);
  box-shadow: .3rem .3rem .15rem var(--shadow-color);
  color: var(--primary-color);

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 2rem 2.5rem;
  margin: 25px 0;
}
.card-container.big {
  height: 8rem;
}
.card-container.big-error {
  height: 10rem;
}
.card-container.big > button {
  width: unset;
}

[data-theme="dark"] .card-container {
  box-shadow: none;
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.text-container > div {
  padding-bottom: .65rem;
}
.text-container.unset-height > div {
  padding-bottom: unset;
}

.card-container > input {
  -ms-transform: scale(1.35); /* IE 9 */
  -webkit-transform: scale(1.35); /* Chrome, Safari, Opera */
  transform: scale(1.35);
}
</style>
