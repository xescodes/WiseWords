
'use client';

import {useState} from 'react';
import {generate} from '@/ai/flows/generate-wise-saying';
import {generateExplanation} from '@/ai/flows/generate-saying-explanation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useToast} from '@/hooks/use-toast';
import {Icons} from '@/components/icons';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [wiseSaying, setWiseSaying] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const {toast} = useToast();

  const generateNewSaying = async () => {
    if (!topic) {
      toast({
        title: 'Error',
        description: 'Please enter a topic.',
      });
      return;
    }
    const result = await generate({topic});
    setWiseSaying(result?.wiseSaying ?? 'Could not generate a wise saying.');
    setExplanation(null); // Reset explanation when generating a new saying
  };

    const getExplanation = async () => {
      if (!wiseSaying) {
      toast({
        title: 'Error',
        description: 'Please generate a wise saying first.',
      });
      return;
    }
    const result = await generateExplanation({saying: wiseSaying});
        setExplanation(result?.explanation ?? 'Could not generate an explanation.');
  };

  const saveSaying = async () => {
    setSaving(true);
    // Simulate saving to a database or local storage
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    toast({
      title: 'Saved!',
      description: 'Wise saying saved to your collection.',
    });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4 text-primary">WiseWords</h1>
      <Card className="w-full max-w-md bg-card shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Get Wise</CardTitle>
          <CardDescription>Enter a topic to receive a wise saying from the Owl.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Input
              type="text"
              placeholder="Enter a topic"
              value={topic}
              onChange={e => setTopic(e.target.value)}
            />
            <Button onClick={generateNewSaying} className="bg-primary text-primary-foreground hover:bg-primary/80">
              Generate Saying
            </Button>
          </div>
          {wiseSaying && (
            <div className="mt-4 p-4 rounded-md border border-border">
              <div className="flex items-center space-x-4">
                <img
                  src="https://picsum.photos/50/50" // Placeholder owl image
                  alt="Wise Owl"
                  className="rounded-full w-12 h-12 object-cover"
                />
                <div>
                  <p className="text-lg italic font-serif">"{wiseSaying}"</p>
                  <p className="text-sm text-muted-foreground mt-1">- The Wise Owl</p>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={getExplanation}
                  disabled={!wiseSaying}
                  className="mr-2"
                >
                  Explain Saying
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={saveSaying}
                  disabled={saving}
                  className="flex items-center"
                >
                  {saving ? <Icons.loader className="mr-2 h-4 w-4 animate-spin" /> : <Icons.shield className="mr-2 h-4 w-4" />}
                  Save
                </Button>
              </div>
            </div>
          )}
          {explanation && (
            <div className="mt-4 p-4 rounded-md border border-border">
              <p className="text-md">
                <span className="font-bold">Explanation:</span> {explanation}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
