'use client';

import { useState } from 'react';
import { GenerationConfig, Trait } from '@/types';
import PromptInput from '@/components/create/PromptInput';
import ConfigPanel from '@/components/create/ConfigPanel';
import NFTPreview from '@/components/create/NFTPreview';

export default function CreatePage() {
  const [config, setConfig] = useState<GenerationConfig>({
    prompt: '',
    style: 'realistic',
    theme: 'fantasy',
    collectionSize: 100,
    traits: [
      { name: 'Background', values: ['Forest', 'Ocean', 'Mountains', 'City', 'Space'] },
      { name: 'Expression', values: ['Happy', 'Serious', 'Surprised', 'Calm'] },
    ],
  });

  const [generating, setGenerating] = useState(false);
  const [preview, setPreview] = useState<string[]>([]);

  const handleGenerate = async () => {
    setGenerating(true);
    // Simulate generation time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock preview images
    const mockImages = Array.from({ length: Math.min(9, config.collectionSize) }, (_, i) => 
      `https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text=NFT+${i + 1}`
    );
    setPreview(mockImages);
    setGenerating(false);
  };

  const handleAddTrait = () => {
    setConfig({
      ...config,
      traits: [...config.traits, { name: 'New Trait', values: ['Value 1', 'Value 2'] }]
    });
  };

  const handleUpdateTrait = (index: number, trait: Trait) => {
    const newTraits = [...config.traits];
    newTraits[index] = trait;
    setConfig({ ...config, traits: newTraits });
  };

  const handleRemoveTrait = (index: number) => {
    const newTraits = config.traits.filter((_, i) => i !== index);
    setConfig({ ...config, traits: newTraits });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Create NFT Collection</h1>
        <p className="text-gray-400">
          Generate unique AI-powered NFT collections up to 9,999 items
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Configuration */}
        <div className="space-y-6">
          <PromptInput
            prompt={config.prompt}
            onChange={(prompt) => setConfig({ ...config, prompt })}
          />
          
          <ConfigPanel
            config={config}
            onConfigChange={setConfig}
            onAddTrait={handleAddTrait}
            onUpdateTrait={handleUpdateTrait}
            onRemoveTrait={handleRemoveTrait}
          />

          <button
            onClick={handleGenerate}
            disabled={!config.prompt || generating}
            className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-semibold transition-colors"
          >
            {generating ? 'Generating...' : 'Generate Collection'}
          </button>
        </div>

        {/* Right Panel - Preview */}
        <NFTPreview
          images={preview}
          loading={generating}
          collectionSize={config.collectionSize}
        />
      </div>
    </div>
  );
}
