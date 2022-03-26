<template>
  <StepContentWrapper direction="row" alignment="center">
    <div class="possibilities-container">
      <p>Choose a date for a meeting</p>
    </div>
  </StepContentWrapper>
</template>

<script>
import { StepContentWrapper } from '@/layouts';

export default {
  name: 'CalendarContent',
  components: { StepContentWrapper },
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
