<script setup lang="ts">
defineEmits(['submit']);
const value = defineModel<string>();
const textareaRef = ref<HTMLElement>();
watch(value, autoGrow);

function autoGrow() {
  if (!textareaRef.value) return;

  if (!value.value) {
    textareaRef.value.style.height = '2em';
    return;
  }

  textareaRef.value.style.height = '5px';
  textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px';
}
</script>

<template>
  <textarea ref="textareaRef" v-model="value" @input="autoGrow" v-on:keypress.ctrl.enter="$emit('submit')" />
</template>

<style scoped>
textarea {
  border: none;
  width: 100%;
  height: 2rem;
  min-height: 1rem;
  max-height: 20rem;
  margin: 0;
  padding: 0.3rem 0.6rem;
  font-size: 1rem;
  font-family: inherit;
  line-height: 1.5rem;
  overflow: hidden;
  outline: 0;
}
</style>
