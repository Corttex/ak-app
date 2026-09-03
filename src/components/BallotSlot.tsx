'use client';
import React from 'react';
import { X } from 'lucide-react';

interface CandidateSlotProps {
  label: string;
  length: number;
  value: string;
  candidateName?: string;
  party?: string;
  photoUrl?: string;
  onChange: (val: string) => void;
  onClear: () => void;
}

export function BallotSlot({
  label,
  length,
  value,
  candidateName,
  party,
  photoUrl,
  onChange,
  onClear
}: CandidateSlotProps) {
  const digits = value.padEnd(length, ' ').split('');

  const handleContainerClick = () => {
    // In a real implementation this might trigger a numeric keyboard or input focus
    // For now we'll just simulate typing a number if it's not full
    if (value.length < length) {
      onChange(value + Math.floor(Math.random() * 10).toString());
    }
  };

  return (
    <div className={`flex flex-col gap-3 ${candidateName ? 'bg-secondary-container/20 backdrop-blur-md p-4 rounded-xl border border-outline-variant/30' : ''}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-primary">{label}</h3>
        {candidateName && (
          <button onClick={onClear} className="text-xs text-error flex items-center gap-1 hover:underline">
            limpar <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Number Slots */}
        <div className="flex gap-2 cursor-pointer" onClick={handleContainerClick}>
          {digits.map((digit, idx) => (
            <div
              key={idx}
              className={`w-12 h-14 flex items-center justify-center border-2 rounded-lg font-display text-2xl font-black ${
                digit.trim() ? 'border-tertiary text-on-surface bg-tertiary/10' : 'border-outline-variant bg-surface text-on-surface'
              }`}
            >
              {digit.trim()}
            </div>
          ))}
        </div>

        {/* Candidate Info Badge */}
        {candidateName && (
          <div className="flex-1 flex items-center gap-3 border-l border-outline-variant/50 pl-4">
            {photoUrl && (
              <img src={photoUrl} alt={candidateName} className="w-12 h-12 rounded-lg object-cover border border-outline" />
            )}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-on-surface uppercase">{candidateName}</span>
              <span className="text-xs font-bold text-on-surface-variant">{party}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
