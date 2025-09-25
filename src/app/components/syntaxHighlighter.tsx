import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';

interface SyntaxHighlighterProps {
  code: string;
  language: 'html' | 'css';
  onChange: (value: string) => void;
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  code,
  language,
  onChange,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (preRef.current) {
      const highlighted = Prism.highlight(
        code,
        language === 'html' ? Prism.languages.markup : Prism.languages.css,
        language === 'html' ? 'markup' : 'css'
      );
      preRef.current.innerHTML = highlighted;
    }
  }, [code, language]);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.currentTarget.scrollTop;
      preRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative h-full ">
      <pre
        ref={preRef}
        className="absolute inset-0 p-4 font-[famil] text-sm leading-6 pointer-events-none overflow-auto bg-transparent text-white no-scrollbar"
        style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        }}
      />
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleInput}
        onScroll={handleScroll}
        className="absolute inset-0 p-4 font-[famil] text-sm leading-6 bg-transparent text-transparent caret-white no-scrollbar resize-none outline-none border-none overflow-auto"
        style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        }}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
};