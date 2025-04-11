import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    'GOOGLE_GENAI_API_KEY environment variable must be set to use the Google AI plugin.'
  );
}

export const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({
      apiKey: apiKey,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
