<script setup lang="ts">
import { ChatMessage } from '@/types';
import { marked } from 'marked';

const { message } = defineProps({
  message: {
    type: Object as PropType<ChatMessage>,
    required: true,
  },
});

const iconCssClass = computed(() => `${message.role}-icon`);
const messageCssClass = computed(() => `message-from-${message.role}`);

const displayMessageContent = computed(() => {
  return marked(message.content.replaceAll('\n', '<br />'));
});
</script>

<template>
  <div class="message-wrapper" :class="messageCssClass">
    <div class="message">
      <div class="icon" :class="iconCssClass" />
      <div class="message-content" v-html="displayMessageContent"></div>
    </div>
  </div>
</template>

<style scoped>
.message-wrapper {
  border-bottom: 1px solid;
  border-bottom: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
}
.message {
  display: flex;
  align-items: flex-start;
  gap: var(--gap);
  padding: calc(var(--gap) * 2);
  max-width: var(--max-width);
  margin-inline: auto;
}

.message-from-system {
  background-color: rgb(247, 247, 248);
}

.message-from-assistant {
  background-color: rgb(247, 247, 248);
}

.message-content {
  padding-block: var(--gap);
  line-height: 1.5rem;
  max-width: 100%;
}

@keyframes chat-gpt-color {
  from {
    background-color: #19c37d;
  }
  20% {
    background-color: #8a2be2;
  }
  40% {
    background-color: #237116;
  }
  60% {
    background-color: #b0b0b0;
  }
  80% {
    background-color: #00bfff;
  }
  to {
    background-color: #19c37d;
  }
}

.chatgpt-icon,
.icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.system-icon {
  background-color: slategray;
  mask: url('system.svg') no-repeat center;
}
.assistant-icon {
  animation: chat-gpt-color 6s infinite;
  mask: url('chatgpt.svg') no-repeat center;
}
.user-icon {
  background-color: slategray;
  mask: url('user.svg') no-repeat center;
}
</style>
