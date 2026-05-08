'use client';

interface GoldDividerProps {
  symbol?: string;
  className?: string;
}

export default function GoldDivider({ symbol = '✦', className = '' }: GoldDividerProps) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-400/30" />
      <span className="gold-text text-sm">{symbol}</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-400/30" />
    </div>
  );
}
