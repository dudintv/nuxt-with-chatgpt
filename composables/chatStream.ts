const resolveStream = async ({ stream, data, onChunk = ({ data }: any) => {}, onReady = () => {} }: any) => {
  const reader = (stream as ReadableStream).pipeThrough(new TextDecoderStream()).getReader();
  while (true) {
    const stream = await reader.read();
    if (stream.done) break;

    const chunks = stream?.value
      .replaceAll(/^data: /gm, '')
      .split('\n')
      .filter((c: string) => Boolean(c.length) && c !== '[DONE]')
      .map((c: string) => JSON.parse(c));

    for (let chunk of chunks) {
      const content = chunk.choices[0].delta.content;
      if (!content) continue;

      data.value += content;
      onChunk({ data: content });
    }
  }

  onReady({ data: data.value });
};

export const useChatStream = ({ stream, onChunk = ({ data }: any) => {}, onReady = () => {} }: any) => {
  const data = ref('');

  resolveStream({
    stream,
    data,
    onChunk,
    onReady,
  });

  return {
    data: readonly(data),
  };
};

export const getAnswerStream = async ({ messages }: any) => {
  const response = await fetch('/api/chatgpt', {
    method: 'POST',
    body: JSON.stringify({
      messages,
    }),
  });
  if (!response.body) throw new Error('Unknown error');

  return response.body;
};
