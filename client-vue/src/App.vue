<template>
  <Header />
  <router-view/>
</template>

<script>
import { Header } from '@/layouts';

export default {
  components: { Header }
};

</script>

<style>
@import 'assets/styles/global.css';
</style>
