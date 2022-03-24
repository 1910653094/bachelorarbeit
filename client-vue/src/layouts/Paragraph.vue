<template>
  <div class="paragraph-container">
    <h2 class="paragraph-title">{{ title }}</h2>
    <slot>No content</slot>
  </div>
</template>

<script>
export default {
  props: ['title'],
  name: 'Paragraph',
};
</script>

<style scoped>
.paragraph-title {
  font-weight: 350;
  text-transform: uppercase;
  color: var(--tertiary-color);

  margin-bottom: 1.4rem;
}
.paragraph-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 3rem 0 0 5rem;
}
</style>
