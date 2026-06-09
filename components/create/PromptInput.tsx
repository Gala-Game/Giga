'use client';

import { useState } from 'react';

interface PromptInputProps {
  prompt: string;
  onChange: (prompt: string) => void;
}

export default function PromptInput({ prompt, onChange }: PromptInputProps) {
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
      <h2 className="text-xl font-semibold text-white mb-4">Prompt & Base Image</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Text Prompt *
          </label>
          <textarea
            value={prompt}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Describe your NFT collection (e.g., 'Cyberpunk cats with neon accessories')"
            rows={4}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Base Image (Optional)
          </label>
          <div className="flex items-center gap-4">
            <label className="flex-1 cursor-pointer">
              <div className="border-2 border-dashed border-slate-600 hover:border-purple-500 rounded-lg p-4 text-center transition-colors">
                {image ? (
                  <div className="text-sm text-white">
                    <p className="font-medium">{image.name}</p>
                    <p className="text-gray-400">Click to change</p>
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">
                    <p>Click to upload base image</p>
                    <p className="text-xs mt-1">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
