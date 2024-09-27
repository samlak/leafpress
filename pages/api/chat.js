import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';

export const maxDuration = 60;

export const config = {
  runtime: 'experimental-edge', 
  unstable_allowDynamic: [
    '/node_modules/ajv/**', 
  ],
}

export default async function POST(req) {
  try {
    const { messages, data } = await req.json();

    const systemMessage = `You are an utility bill analyser`;
    const prompt = `Your task it to answer any question associated with this electric bill and other message related to it. 
    If you are asked any question outside this scope tell them that this chatbot is meant to provide information utility bill.`;
  
    const result = await streamText({
      model: openai('gpt-4o'),
      system: systemMessage,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image', image: new URL(data.imageUrl) },
          ],
        },
        ...convertToCoreMessages(messages),
      ],
    });
  
    return result.toDataStreamResponse();
  } catch (error) {
    console.log({ error })
  }
}