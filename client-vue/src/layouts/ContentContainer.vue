<template>
  <div class="content-container">
    <div class="exp-date" v-if="from">
      {{ from }}
      {{ to ?? ( ' - ' + to ) }}
    </div>
    <h3>{{ title }}</h3>
    <h4>{{ subtitle }}</h4>
  </div>
</template>

<script>
export default {
  name: 'ContentContainer',
  props: { title: String, subtitle: String, from: String, to: String },
};
</script>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-bottom: 1.3rem;
}
.content-container > h3 {
  font-weight: normal;
  font-size: 1.25rem;
  color: var(--primary-color);
}
.content-container > h4 {
  font-size: .95rem;
  margin-bottom: .2rem;
  color: var(--tertiary-color);
  font-weight: normal;
  max-width: 30rem;
  text-align: left;
}
</style>
