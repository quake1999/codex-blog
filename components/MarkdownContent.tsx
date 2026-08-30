import type { ReactNode } from 'react';

function inline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean).map((part, index) => {
    if (part.startsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={index} href={link[2]}>{link[1]}</a>;
    return part;
  });
}

export function MarkdownContent({ source }: { source: string }) {
  const lines = source.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) { index++; continue; }
    if (line.startsWith('```')) {
      const language = line.slice(3);
      const code: string[] = [];
      index++;
      while (index < lines.length && !lines[index].startsWith('```')) code.push(lines[index++]);
      blocks.push(<pre key={index} data-language={language}><code>{code.join('\n')}</code></pre>);
      index++; continue;
    }
    if (line.startsWith('## ')) blocks.push(<h2 key={index}>{inline(line.slice(3))}</h2>);
    else if (line.startsWith('### ')) blocks.push(<h3 key={index}>{inline(line.slice(4))}</h3>);
    else if (line.startsWith('> ')) blocks.push(<blockquote key={index}>{inline(line.slice(2))}</blockquote>);
    else if (line.startsWith('- ')) {
      const items: string[] = [];
      while (index < lines.length && lines[index].startsWith('- ')) items.push(lines[index++].slice(2));
      blocks.push(<ul key={index}>{items.map((item, i) => <li key={i}>{inline(item)}</li>)}</ul>);
      continue;
    } else {
      const paragraph = [line];
      while (index + 1 < lines.length && lines[index + 1].trim() && !/^(#{2,3} |> |- |```)/.test(lines[index + 1])) paragraph.push(lines[++index]);
      blocks.push(<p key={index}>{inline(paragraph.join(' '))}</p>);
    }
    index++;
  }
  return <div className="markdown-body">{blocks}</div>;
}
