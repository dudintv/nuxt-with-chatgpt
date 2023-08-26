<script setup lang="ts">
const value = defineModel<string>();
</script>

<template>
  <div class="system-promt">
    <div class="container">
      <div class="title">System promt</div>
      <div class="textarea-wrapper">
        <TextareaInput v-model="value" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.system-promt {
  padding: var(--gap);
  background-color: rgba(0, 0, 0, 0.03);
}

.container {
  max-width: var(--max-width);
  margin-inline: auto;
}

.textarea-wrapper {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--radius);
  background-color: white;
  padding: calc(var(--gap) / 2);
}

.title {
  color: rgba(0, 0, 0, 0.5);
  margin-block: var(--gap);
  padding-left: 0.8rem;
}
</style>
