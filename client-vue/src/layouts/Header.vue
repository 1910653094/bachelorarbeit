<template>
  <div class="header-container">
    <BackArrowIcon
        v-if="$route.path.includes('contact')"
        class="back-arrow"
        @click="back"
    />
    <Switch />
  </div>
</template>

<script>
import { Switch } from '@/components';
import { BackArrowIcon } from '@/assets';

export default {
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  name: 'Header',
  components: { BackArrowIcon, Switch },
};
</script>

<style scoped>
.header-container {
  width: 100%;
  display: flex;
  position: relative;
  z-index: 1;
}

.back-arrow {
  margin-left: 1%;
  width: 3%;
  color: var(--primary-color);
}

</style>
