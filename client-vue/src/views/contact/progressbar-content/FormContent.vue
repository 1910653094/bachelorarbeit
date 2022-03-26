<template>
  <StepContentWrapper>
    <Input
        title="Company"
        type="text"
        :value="company"
        :onChange="e => setCompany(e.target.value)"
    />
    <Input
        title="Contact person"
        type="text"
        :value="name"
        :onChange="e => setName(e.target.value)"
    />
    <Input
        title="Contact email"
        type="text"
        :value="email"
        :onChange="e => setEmail(e.target.value)"
    />

    <TextArea
        title="Job description"
        :cols="30"
        :rows="10"
        :value="description"
        :onChange="e => setDescription(e.target.value)"
    />
  </StepContentWrapper>
</template>

<script>
import { Input, TextArea } from '@/components';
import { StepContentWrapper } from '@/layouts';

export default {
  name: 'FormContent',
  components: { Input, StepContentWrapper, TextArea },
  props: {
    company: String,
    setCompany: Function,
    description: String,
    setDescription: Function,
    email: String,
    setEmail: Function,
    name: String,
    setName: Function,
  },
};
</script>

<style scoped>

</style>
