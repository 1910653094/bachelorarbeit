<template>
  <ErrorPageWrapper>
    <h1>Page not found</h1>
    <div>
      Page you are trying to visit does not exist. You will be redirected in{{' '}}
      {{ timeLeft }} seconds.
    </div>
    <router-link :to="{ name: 'MyCV' }">Redirect now</router-link>
  </ErrorPageWrapper>
</template>

<script>
import { ErrorPageWrapper } from '@/layouts';

export default {
  data() {
    return {
      timeLeft: 3,
    }
  },
  mounted() {
    /*const interval = setInterval(() => {
      --this.timeLeft;
      if (this.timeLeft <= 0) {
        this.$router.push({ name: 'MyCV' });
        clearInterval(interval);
      }
    }, 1000);*/
  },
  name: 'NotFoundView',
  components: { ErrorPageWrapper },
};

</script>

<style scoped>
a {
  text-decoration: none;
  color: #387cf6;
}
</style>
