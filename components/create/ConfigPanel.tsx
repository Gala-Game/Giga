'use client';

import { GenerationConfig, Trait } from '@/types';

interface ConfigPanelProps {
  config: GenerationConfig;
  onConfigChange: (config: GenerationConfig) => void;
  onAddTrait: () => void;
  onUpdateTrait: (index: number, trait: Trait) => void;
  onRemoveTrait: (index: number) => void;
}

export default function ConfigPanel({
  config,
  onConfigChange,
  onAddTrait,
  onUpdateTrait,
  onRemoveTrait,
}: ConfigPanelProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 space-y-6">
      <h2 className="text-xl font-semibold text-white">Collection Settings</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Style
          </label>
          <select
            value={config.style}
            onChange={(e) => onConfigChange({ ...config, style: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="realistic">Realistic</option>
            <option value="cartoon">Cartoon</option>
            <option value="anime">Anime</option>
            <option value="3d">3D Render</option>
            <option value="pixel">Pixel Art</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Theme
          </label>
          <select
            value={config.theme}
            onChange={(e) => onConfigChange({ ...config, theme: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="fantasy">Fantasy</option>
            <option value="sci-fi">Sci-Fi</option>
            <option value="cyberpunk">Cyberpunk</option>
            <option value="nature">Nature</option>
            <option value="abstract">Abstract</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Collection Size
          </label>
          <input
            type="number"
            min="1"
            max="25000"
            value={config.collectionSize}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value) && value >= 1 && value <= 25000) {
                onConfigChange({ ...config, collectionSize: value });
              }
            }}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <p className="text-xs text-gray-400 mt-1">Maximum 25,000 items</p>
        </div>
      </div>

      {/* Traits */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-white">Traits</h3>
          <button
            onClick={onAddTrait}
            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm text-white transition-colors"
          >
            + Add Trait
          </button>
        </div>

        <div className="space-y-3">
          {config.traits.map((trait, index) => (
            <div key={index} className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <input
                  type="text"
                  value={trait.name}
                  onChange={(e) => onUpdateTrait(index, { ...trait, name: e.target.value })}
                  className="flex-1 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button
                  onClick={() => onRemoveTrait(index)}
                  className="ml-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {trait.values.map((value, vIndex) => (
                  <span
                    key={vIndex}
                    className="px-2 py-1 bg-slate-700 rounded text-xs text-gray-300"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
