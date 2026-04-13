import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

type MarkdownRendererProps = {
  content: string;
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      className="prose prose-zinc max-w-none"
      components={{
        code(props) {
          const { children, className, ...rest } = props;
          const languageMatch = /language-(\w+)/.exec(className ?? '');
          const code = String(children).replace(/\n$/, '');

          if (languageMatch) {
            return (
              <SyntaxHighlighter PreTag="div" language={languageMatch[1]} style={oneLight}>
                {code}
              </SyntaxHighlighter>
            );
          }

          return (
            <code className={className} {...rest}>
              {children}
            </code>
          );
        }
      }}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
}
