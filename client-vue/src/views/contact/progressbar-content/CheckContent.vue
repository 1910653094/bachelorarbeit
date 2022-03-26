<template>
  <StepContentWrapper direction="row">
    <div class="form-half-container" v-for="split in data">
      <ContentContainer v-for="s in split" v-bind="s" />
    </div>
  </StepContentWrapper>
</template>

<script>
import { ContentContainer, StepContentWrapper } from '@/layouts';

export default {
  name: 'CheckContent',
  components: { ContentContainer, StepContentWrapper },
  props: {
    company: String,
    description: String,
    email: String,
    name: String,
    date: Object,
  },
  data() {
    return {
      keys: [
        [
          {
            title: 'Company',
            key: 'company'
          },
          {
            title: 'Contact person name',
            key: 'name'
          },
          {
            title: 'Contact person email',
            key: 'email'
          },
          {
            title: 'Job description',
            key: 'description'
          }
        ],
        [
          {
            title: 'Meeting date',
            key: 'key'
          },
          {
            title: 'From',
            key: 'from'
          },
          {
            title: 'Until',
            key: 'until'
          },
        ]
      ],
      data: [],
    };
  },
  mounted() {
    this.data = this.keys
        .map(key => key
            .map(k => ({
                title: k.title,
                subtitle: this?.date[k.key] || this[k.key]
            }))
        );
  },
};
</script>

<style scoped>
.form-half-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  width: 50%;
  text-align: left;
}
</style>
