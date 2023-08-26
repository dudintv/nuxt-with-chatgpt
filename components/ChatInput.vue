<script setup lang="ts">
const value = defineModel<string>();
defineEmits(['send']);

const canAsk = computed(() => value.value?.trim() !== '');
</script>

<template>
  <div class="chat-input">
    <div class="container">
      <TextareaInput v-model="value" @submit="$emit('send')" />
      <button class="send-button" @click="$emit('send')" :disabled="!canAsk">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M3 20v-6l8-2l-8-2V4l19 8Z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-input {
  background-color: white;
  border-top: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  padding-inline: var(--gap);
}

.container {
  background-color: white;
  display: flex;
  align-items: flex-end;
  gap: var(--gap);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--radius);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  margin: var(--gap);
  padding: var(--gap);
  max-width: var(--max-width);
  margin-inline: auto;
}

.send-button {
  background-color: rgb(25, 195, 125);
  width: 32px;
  height: 32px;

  border: none;
  border-radius: calc(var(--radius) / 2);
  color: white;
}
.send-button:disabled {
  background-color: grey;
}

.send-button:hover {
  cursor: pointer;
}
</style>
