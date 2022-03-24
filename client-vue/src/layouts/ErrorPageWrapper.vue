<template>
  <div class="err-page-wrapper">
    <div class="content">
      <slot>
        This will only be displayed if there is no content
        to be distributed.
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPageWrapper',
};
</script>

<style scoped>
  .err-page-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0 0 0 0;
  }

  .err-page-wrapper > .content {
    height: 66%;
    width: 100%;
    padding: 2rem 20%;
    background-color: var(--background-color);
  }
  .err-page-wrapper > .content h1 {
    font-weight: bold;
    font-size: 32px;
    line-height: 100%;
    letter-spacing: 0.01em;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  .err-page-wrapper > .content div {
    margin-bottom: 1rem;
    color: var(--secondary-color);
  }

  .err-page-wrapper > .content a {
    text-decoration: none;
    font-weight: 500;
    font-size: 18px;
    color: var(--interactive-color);
  }

</style>
