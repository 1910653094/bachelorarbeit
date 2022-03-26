<template>
  <div class="home-header">
    <h1>Meeting dates</h1>
    <p>Add dates to indicate that you have time for a meeting on this day and time</p>
  </div>
</template>

<script>
import { auth } from '@/store/auth-store';

export default {
  name: 'AccountView',
  mounted() {
    console.log(auth);
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

.home-container {
  display: flex;
  justify-content: space-between;

  margin: 0 1rem;
}

.step-content-container div#now {
  height: unset; /* WHY?? */
}

.home-calendar {
  margin-left: 2rem;
}
</style>
