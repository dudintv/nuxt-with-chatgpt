<script setup lang="ts">
import { useChatStream, getAnswerStream } from '@/composables/chatStream';
import { ChatMessage, AnswerMessage, SystemMessage } from '@/types';

const systemMessage = ref('You are helpful assistant.');
const messages = ref<ChatMessage[]>([]);
const promt = ref('');
const answering = ref<AnswerMessage>();
const messagesListRef = ref<HTMLElement>();

const canAsk = computed(() => promt.value.trim() !== '');

async function askQuestion() {
  if (!canAsk.value) return;

  messages.value.length === 0 &&
    messages.value.push({
      role: 'system',
      content: systemMessage.value,
    } as SystemMessage);

  messages.value.push({
    role: 'user',
    content: promt.value,
  });
  promt.value = '';

  const stream = await getAnswerStream({ messages: messages.value });
  answering.value = {
    role: 'assistant',
    content: '',
  };
  useChatStream({
    stream,
    onChunk: ({ data }: any) => {
      answering.value && (answering.value.content += String(data));
    },
    onReady: () => {
      answering.value && messages.value.push(answering.value);
      answering.value = undefined;
    },
  });
}

watch(
  [messages, answering],
  async () => {
    await nextTick();
    messagesListRef.value?.scrollTo(0, messagesListRef.value?.scrollHeight + 1000);
  },
  { deep: true },
);
</script>

<template>
  <div class="app">
    <div v-if="messages.length" class="messages-wrapper" ref="messagesListRef">
      <ChatMessageItem :message="message" v-for="(message, index) in messages" :key="index" />
      <ChatMessageItem v-if="answering" :message="answering" />
      <div style="height: 1px"></div>
    </div>
    <div class="no-messages" v-else>
      <SystemInput v-model="systemMessage" />
      <span class="placeholder">ChatGPT</span>
    </div>
    <ChatInput v-model="promt" class="chat-input" @send="askQuestion" />
  </div>
</template>

<style>
:root {
  --max-width: 45rem;
  --gap: 0.5rem;
  --radius: 0.5rem;
}

.app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.messages-wrapper {
  overflow: auto;
}

.no-messages {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.placeholder {
  display: grid;
  place-items: center;
  flex-grow: 1;
  color: rgba(36, 94, 146, 0.1);
  font-size: 3rem;
}
</style>
