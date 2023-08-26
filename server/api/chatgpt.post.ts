import OpenAI from 'openai';
import { ChatMessage } from '@/types';
import { Stream } from 'openai/streaming';

const openai = new OpenAI({
  apiKey: useRuntimeConfig().openAi.secretKey,
});

function toReadableStream(stream: Stream<OpenAI.Chat.Completions.ChatCompletionChunk>): ReadableStream {
  let iter: AsyncIterator<OpenAI.Chat.Completions.ChatCompletionChunk>;
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start() {
      iter = stream[Symbol.asyncIterator]();
    },
    async pull(ctrl) {
      try {
        const { value, done } = await iter.next();
        if (done) return ctrl.close();

        const str =
          typeof value === 'string'
            ? value
            : // Add a newline after JSON to make it easier to parse newline-separated JSON on the frontend.
              JSON.stringify(value) + '\n';
        const bytes = encoder.encode(str);

        ctrl.enqueue(bytes);
      } catch (err) {
        ctrl.error(err);
      }
    },
    async cancel() {
      await iter.return?.();
    },
  });
}

const getChatStream = async ({ messages }: { messages: ChatMessage[] }) => {
  const stream = await openai.chat.completions.create({
    max_tokens: 2048,
    model: 'gpt-3.5-turbo', // or `gpt-4`
    temperature: 0.5,
    messages,
    stream: true,
  });

  return stream;
};

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  const { messages } = JSON.parse(data);
  const stream = await getChatStream({ messages });
  return sendStream(event, toReadableStream(stream));
});
