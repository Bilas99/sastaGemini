import { useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";


const MarkdownRenderer = ({ text }) => {
  return (
    <div 
      className="w-max max-w-full prose 
      prose-pre:ml-4 prose-pre:bg-transparent
      prose-pre:p-0
    ">
      <Markdown
        // remarkPlugins={[remarkGfm]}
        components={{
          code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          return match ? (
            <CodeBlock 
              code={String(children).trim()} 
              language={match[1]} 
            />
          ) : (
            <kbd className="bg-gray-100 text-pink-800 px-1 rounded text-sm font-mono" {...props}>
              {String(children)}
            </kbd>
          )}
        }}
      >
        {text}
      </Markdown>
    </div>
  );
};

// CodeBlock Component with Copy Button
const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="relative">
      <button
        onClick={copyToClipboard}
        className="absolute top-0 right-0
        text-gray-800 px-2 py-1 text-xs 
        rounded"
      >
        {copied ? "copied!" : "copy"}
      </button>
      <SyntaxHighlighter
        language={language || "bash"}
        style={oneLight}
        PreTag="div"
        customStyle={{background: '#f8f8f8'}}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default MarkdownRenderer;