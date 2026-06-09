'use client';

interface NFTPreviewProps {
  images: string[];
  loading: boolean;
  collectionSize: number;
}

export default function NFTPreview({ images, loading, collectionSize }: NFTPreviewProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Preview</h2>
        {images.length > 0 && (
          <span className="text-sm text-gray-400">
            Showing {images.length} of {collectionSize} items
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-gray-400">Generating your NFT collection...</p>
          </div>
        </div>
      ) : images.length > 0 ? (
        <div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-slate-900 rounded-lg overflow-hidden border border-slate-700"
              >
                <img
                  src={image}
                  alt={`NFT ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors">
              Generate Full Collection
            </button>
            <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
              Export Metadata
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-96 border-2 border-dashed border-slate-700 rounded-lg">
          <div className="text-center text-gray-400">
            <svg
              className="mx-auto h-12 w-12 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p>Preview will appear here</p>
            <p className="text-sm mt-1">Enter a prompt and click Generate</p>
          </div>
        </div>
      )}
    </div>
  );
}
