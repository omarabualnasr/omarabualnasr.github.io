import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface QuickContactBoxProps {
  recipientEmail: string;
}

export const QuickContactBox: React.FC<QuickContactBoxProps> = ({ recipientEmail }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Construct Gmail compose URL
    const encodedBody = encodeURIComponent(message);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&body=${encodedBody}`;
    
    // Open in new tab
    window.open(gmailUrl, '_blank');
    setMessage('');
  };

  return (
    <div className="w-full">
      <form 
        onSubmit={handleSubmit}
        className={`group relative flex flex-col transition-all duration-500 border-b ${
          isFocused ? 'border-[var(--accent-cyan-restrained)]' : 'border-[var(--border-subtle)]'
        }`}
      >
        <div className="flex items-center gap-3 px-2 py-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="MESSAGE..."
            rows={1}
            className="flex-1 bg-transparent border-none outline-none text-xs font-mono-metadata tracking-widest text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] resize-none overflow-hidden"
            style={{ minHeight: '1.25rem' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className={`p-1 transition-all duration-300 ${
              message.trim() 
                ? 'text-[var(--accent-cyan-restrained)] opacity-100' 
                : 'text-[var(--text-tertiary)] opacity-20 cursor-not-allowed'
            }`}
            aria-label="Send dispatch"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        
        {/* Indicator line (removed glow in light mode) */}
        <div 
          className={`absolute bottom-0 left-0 h-[1.5px] bg-[var(--accent-cyan-restrained)] transition-all duration-700 ease-out shadow-transparent dark:shadow-[0_0_8px_var(--accent-cyan-restrained)] ${
            isFocused ? 'w-full' : 'w-0'
          }`} 
        />
      </form>
    </div>
  );
};
