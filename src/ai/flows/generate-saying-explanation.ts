'use server';

/**
 * @fileOverview Generates an explanation for a given saying.
 *
 * - generateExplanation - A function that takes a wise saying and generates an explanation.
 * - GenerateExplanationInput - The input type for the generateExplanation function.
 * - GenerateExplanationOutput - The return type for the generateExplanation function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateExplanationInputSchema = z.object({
  saying: z.string().describe('The wise saying to be explained.'),
});
export type GenerateExplanationInput = z.infer<typeof GenerateExplanationInputSchema>;

const GenerateExplanationOutputSchema = z.object({
  explanation: z.string().describe('A short explanation of the saying.'),
});
export type GenerateExplanationOutput = z.infer<typeof GenerateExplanationOutputSchema>;

export async function generateExplanation(input: GenerateExplanationInput): Promise<GenerateExplanationOutput> {
  try {
    const result = await explainSayingPrompt(input);
    console.log('Raw AI Response:', result); // Log the raw AI response
    return result.output!;
  } catch (error) {
    console.error('Error in generateExplanation:', error);
    return {explanation: 'Could not generate an explanation due to an error.'};
  }
}

const explainSayingPrompt = ai.definePrompt({
  name: 'explainSayingPrompt',
  input: {
    schema: GenerateExplanationInputSchema,
  },
  output: {
    schema: z.object({
      explanation: z.string().describe('A short explanation of the saying.'),
    }),
  },
  prompt: `You are a wise owl, known for your insightful explanations.

  A user asks you to elaborate on the following wise saying:

  {{saying}}

  Explain the meaning of this saying in a clear and concise manner.
  `,
});
