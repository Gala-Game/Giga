'use client';

import { useState } from 'react';
import { Trade } from '@/types';
import { formatTimeAgo, formatCurrency, formatPercentage } from '@/lib/mockData';

interface TradeCardProps {
  trade: Trade;
}

export default function TradeCard({ trade }: TradeCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const reactionEmojis = {
    like: '👍',
    fire: '🔥',
    rocket: '🚀',
    thinking: '🤔',
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, this would call an API
      console.log('Adding comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{trade.userAvatar}</div>
          <div>
            <h3 className="text-white font-semibold">{trade.username}</h3>
            <p className="text-sm text-gray-400">{formatTimeAgo(trade.timestamp)}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          trade.tradeType === 'long' 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-red-500/20 text-red-400'
        }`}>
          {trade.tradeType.toUpperCase()}
        </span>
      </div>

      {/* Trade Details */}
      <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <p className="text-sm text-gray-400">Asset</p>
            <p className="text-xl font-bold text-white">{trade.asset}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Performance</p>
            <p className={`text-xl font-bold ${
              trade.performance >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {formatPercentage(trade.performance)}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <p className="text-gray-400">Entry</p>
            <p className="text-white">{formatCurrency(trade.entryPrice)}</p>
          </div>
          <div>
            <p className="text-gray-400">Current</p>
            <p className="text-white">{formatCurrency(trade.currentPrice)}</p>
          </div>
          <div>
            <p className="text-gray-400">Amount</p>
            <p className="text-white">{trade.amount}</p>
          </div>
        </div>
      </div>

      {/* Reactions */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {Object.entries(reactionEmojis).map(([type, emoji]) => {
          const count = trade.reactions.filter(r => r.type === type).length;
          return count > 0 && (
            <button
              key={type}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-full text-sm transition-colors flex items-center gap-1"
            >
              <span>{emoji}</span>
              <span className="text-gray-300">{count}</span>
            </button>
          );
        })}
        <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-full text-sm text-gray-300 transition-colors">
          + React
        </button>
      </div>

      {/* Comments Section */}
      <div className="border-t border-slate-700 pt-4">
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-sm text-gray-400 hover:text-white transition-colors mb-3"
        >
          {trade.comments.length} {trade.comments.length === 1 ? 'Comment' : 'Comments'}
        </button>

        {showComments && (
          <div className="space-y-3 mb-3">
            {trade.comments.map(comment => (
              <div key={comment.id} className="flex gap-3">
                <div className="text-xl">{comment.userAvatar}</div>
                <div className="flex-1 bg-slate-900/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{comment.username}</span>
                    <span className="text-xs text-gray-500">{formatTimeAgo(comment.timestamp)}</span>
                  </div>
                  <p className="text-sm text-gray-300">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {showComments && (
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
            >
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
